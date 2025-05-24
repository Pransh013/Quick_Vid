"use client";

import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { useRouter } from "next/navigation";

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string) =>
  fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok)
      throw new Error(`Upload failed with status ${response.status}`);
  });

export default function UploadPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [formData, setFormData] = useState<VideoFormValues>({
    title: "",
    description: "",
    visibility: "public",
  });

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if (video.duration !== 0) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload video and thumbnail");
        return;
      }
      if (!formData.title || !formData.description) {
        setError("Please fill in all required fields.");
        return;
      }

      const {
        videoId,
        accessKey: videoAccessKey,
        uploadUrl: videoUploadUrl,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey)
        throw new Error("Failed to get video upload credentials");

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      const {
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
        uploadUrl: thumbnailUploadUrl,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
        throw new Error("Failed to get thumbnail upload credentials");

      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });
      router.push(`/video/${videoId}`);
    } catch (error) {
      console.log("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a new video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        className="rounded-20 gap-4 w-full flex flex-col shadow-10 px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          placeholder="Enter a title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <FormField
          id="description"
          placeholder="Enter a description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          as="textarea"
        />

        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          type="video"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onReset={video.resetFile}
          onChange={video.handleFileChange}
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          type="image"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onReset={thumbnail.resetFile}
          onChange={thumbnail.handleFileChange}
        />

        <FormField
          id="visibility"
          placeholder="Enter a visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleChange}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

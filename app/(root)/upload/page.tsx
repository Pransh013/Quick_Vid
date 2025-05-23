"use client";

import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";

export default function UploadPage() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
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

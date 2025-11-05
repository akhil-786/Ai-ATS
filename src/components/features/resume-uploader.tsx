'use client';

import { useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export function ResumeUploader({ onUpload, isLoading }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (file: File | null | undefined) => {
    if (file) {
      setFileName(file.name);
      onUpload(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  return (
    <div
      className={cn(
        'w-full max-w-3xl mx-auto rounded-lg p-8 text-center transition-all duration-300',
        'shadow-neumorphic-inset bg-background',
        isDragging && 'scale-105 shadow-neumorphic ring-2 ring-primary'
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <label
        htmlFor="resume-upload-input"
        className="flex flex-col items-center justify-center cursor-pointer w-full"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 text-primary">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="font-semibold text-lg">Analyzing your resume...</p>
            <p className="text-sm text-muted-foreground">This may take a moment. Please wait.</p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center justify-center gap-2 text-accent">
            <FileText className="h-12 w-12" />
            <p className="font-semibold text-lg">File Selected</p>
            <p className="text-sm text-muted-foreground">{fileName}</p>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                setFileName(null);
              }}
            >
              Choose a different file
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-background p-4 shadow-neumorphic mb-4">
              <UploadCloud className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-headline text-2xl font-semibold text-foreground">
              Drag & Drop Your Resume
            </h3>
            <p className="mt-2 text-muted-foreground">
              or click to browse. Supports PDF, DOCX, and TXT files.
            </p>
            <input
              id="resume-upload-input"
              type="file"
              className="hidden"
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.txt"
              disabled={isLoading}
            />
          </>
        )}
      </label>
    </div>
  );
}

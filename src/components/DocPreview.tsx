import { motion } from "motion/react";
import { Download, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string | undefined;
  /** File served from the site (pdf or image) */
  file: string;
  /** Optional external verification / source link */
  link?: string | undefined;
  linkLabel?: string | undefined;
  downloadName?: string | undefined;
};

const isImage = (src: string) => /\.(png|jpe?g|webp|gif|svg)$/i.test(src);

export default function DocPreview({
  open,
  onOpenChange,
  title,
  subtitle,
  file,
  link,
  linkLabel = "Verify",
  downloadName,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="surface-card flex h-[88vh] max-h-[88vh] w-[calc(100%-1.5rem)] max-w-4xl flex-col overflow-hidden rounded-2xl p-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="shrink-0 border-b border-border px-5 py-4 pr-14 sm:px-6">
            <DialogTitle className="text-lg leading-snug sm:text-xl">{title}</DialogTitle>
            {subtitle && (
              <DialogDescription className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {subtitle}
              </DialogDescription>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-hidden bg-secondary/40">
            {isImage(file) ? (
              <img
                src={file}
                alt={`${title} preview`}
                className="h-full w-full object-contain"
              />
            ) : (
              <iframe
                src={`${file}#view=FitH&toolbar=0`}
                title={`${title} preview`}
                className="h-full w-full bg-background"
              />
            )}
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 border-t border-border px-5 py-4 sm:px-6">
            <a
              href={file}
              download={downloadName}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Download size={16} /> Download
            </a>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ExternalLink size={16} /> {linkLabel}
              </a>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

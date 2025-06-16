
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  title = "Ошибка",
  message,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-black">
          {message}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;

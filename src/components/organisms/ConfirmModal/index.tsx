import type { HTMLAttributes } from "react";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import clsx from "clsx";
import "./index.scss";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

type ConfirmModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isProcessing?: boolean;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isProcessing = false,
  className,
  ...rest
}: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx("confirm-modal confirm-modal--open", className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
      {...rest}
    >
      <div className="confirm-modal__backdrop" onClick={onClose} aria-hidden="true"></div>
      <div className="confirm-modal__dialog" role="document">
        <div className="confirm-modal__header">
          <Heading as="h3" noOfLines={1} id="confirm-modal-title" className="confirm-modal__title">
            {title}
          </Heading>
          <IconButton
            svgName="icn_close"
            className="confirm-modal__close"
            ariaLabel="Close"
            iconWidth={16}
            iconHeight={16}
            onClick={onClose}
          />
        </div>
        <div className="confirm-modal__body">
          <Text as="p" lineClamp={4}>{message}</Text>
        </div>
        <div className="confirm-modal__actions">
          <Button
            type="button"
            variant="secondary"
            className="confirm-modal__button confirm-modal__button--cancel"
            onClick={onClose}
            disabled={isProcessing}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="primary"
            className="confirm-modal__button confirm-modal__button--confirm"
            onClick={onConfirm}
            isLoading={isProcessing}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

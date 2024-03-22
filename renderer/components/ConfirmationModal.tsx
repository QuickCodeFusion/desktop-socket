import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./ui/Dialog"
import Button from "./ui/Button"

const ConfirmationModal = ({ isOpen, title, description, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-full bg-neutral-800">
        <DialogHeader className="text-lg font-semibold text-white">{title}</DialogHeader>
        <DialogDescription className="text-center font-semibold text-white text-md">{description}</DialogDescription>
        <DialogFooter className="mt-4 flex justify-center">
          <Button className="w-fit" onClick={onConfirm}>Confirm</Button>
          <Button className="w-fit" onClick={onCancel}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
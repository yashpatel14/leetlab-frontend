import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogClose asChild>
              <button type="button" className="absolute top-4 right-4">
                <X className="w-5 h-5" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                placeholder="Enter playlist name"
                {...register("name", { required: "Playlist name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter playlist description"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Playlist</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistModal;

import React, { useEffect, useState } from "react";
import { Plus, X, Loader } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add to Playlist</DialogTitle>
            <DialogClose asChild>
              <button type="button" className="absolute top-4 right-4">
                <X className="w-5 h-5" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="playlist">Select Playlist</Label>
              <Select
                value={selectedPlaylist}
                onValueChange={setSelectedPlaylist}
                disabled={isLoading}
              >
                <SelectTrigger id="playlist" className="w-full">
                  <SelectValue placeholder="Select a playlist" />
                </SelectTrigger>
                <SelectContent>
                  {playlists.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!selectedPlaylist || isLoading}
              className="flex gap-2 items-center"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to Playlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistModal;

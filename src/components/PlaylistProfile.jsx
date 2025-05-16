import React, { useEffect, useState } from 'react';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, Clock, List, Tag, ExternalLink } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const PlaylistProfile = () => {
  const { getAllPlaylists, playlists, deletePlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    setExpandedPlaylist(prev => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    const variantMap = {
      EASY: 'success',
      MEDIUM: 'warning',
      HARD: 'destructive'
    };
    return <Badge variant={variantMap[difficulty] || 'secondary'}>{difficulty}</Badge>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="p-6 bg-muted min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">My Playlists</h2>
          <Button>Create Playlist</Button>
        </div>

        {playlists.length === 0 ? (
          <Card className="text-center py-10">
            <CardHeader>
              <CardTitle>No playlists found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create your first playlist to organize problems!</p>
              <div className="mt-4">
                <Button>Create Playlist</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {playlists.map((playlist) => (
              <Card key={playlist.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => togglePlaylist(playlist.id)}>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground p-2 rounded-md">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{playlist.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <List size={14} /> {playlist.problems.length} problems
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> Created {formatDate(playlist.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      {expandedPlaylist === playlist.id ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">{playlist.description}</p>

                  {expandedPlaylist === playlist.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-lg font-semibold mb-3">Problems in this playlist</h4>
                      {playlist.problems.length === 0 ? (
                        <p className="text-sm">No problems added to this playlist yet.</p>
                      ) : (
                        <ScrollArea className="max-h-96">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left border-b">
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {playlist.problems.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-muted/50">
                                  <td className="py-2 font-medium">{item.problem.title}</td>
                                  <td>{getDifficultyBadge(item.problem.difficulty)}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags?.map((tag, idx) => (
                                        <Badge variant="outline" key={idx} className="text-xs">
                                          <Tag size={10} className="mr-1" /> {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                      <Link to={`/problem/${item.problem.id}`} className="flex items-center gap-1">
                                        <ExternalLink size={12} /> Solve
                                      </Link>
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </ScrollArea>
                      )}

                      <div className="flex justify-end mt-4">
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(playlist.id)}>
                          Delete Playlist
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistProfile;

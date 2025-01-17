"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Note from "./Note";

interface NoteData {
  id: string;
  userId: string;
  title: string;
  content: string;
  from: string;
}

const NotesList = ({ notes }: { notes: NoteData[] }) => {
  const notesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const reversedNotes = [...notes].reverse();

  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = reversedNotes.slice(
    startIndex,
    startIndex + notesPerPage
  );

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentNotes.map((note) => (
          <Note
            id={note.id}
            userId={note.userId}
            title={note.title}
            content={note.content}
            from={note.from}
            key={note.id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="flex items-center justify-between mt-5">
            <PaginationItem>
              {currentPage > 1 ? (
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              ) : (
                <PaginationPrevious className="opacity-50 pointer-events-none" />
              )}
            </PaginationItem>

            <div className="px-4">
              <span>
                {currentPage} / {totalPages}
              </span>
            </div>

            <PaginationItem>
              {currentPage < totalPages ? (
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              ) : (
                <PaginationNext className="opacity-50 pointer-events-none" />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default NotesList;

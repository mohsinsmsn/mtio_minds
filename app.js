// MITO Minds Game - React-based, ready for Vercel deployment import React, { useState, useEffect } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { motion } from "framer-motion";

const PUZZLES = [ { question: "What comes next in the sequence: 2, 4, 8, 16, ?", answer: "32" }, { question: "If ALL = 36, then BALL = ?", answer: "38" }, { question: "Unscramble: 'ETAPN'", answer: "PATEN" }, { question: "Which number is missing: 3, 6, ?, 12, 15", answer: "9" }, { question: "What is 15% of 200?", answer: "30" }, ];

function getRandomPuzzle() { return PUZZLES[Math.floor(Math.random() * PUZZLES.length)]; }

export default function MITOMindsGame() { const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(6).fill(null))); const [playerScore, setPlayerScore] = useState(0); const [aiScore, setAiScore] = useState(0); const [currentPuzzle, setCurrentPuzzle] = useState(null); const [selectedTile, setSelectedTile] = useState(null); const [userAnswer, setUserAnswer] = useState("");

const handleTileClick = (row, col) => { if (board[row][col]) return; // Already played const puzzle = getRandomPuzzle(); setCurrentPuzzle(puzzle); setSelectedTile([row, col]); };

const handleSubmitAnswer = () => { if (!selectedTile || !currentPuzzle) return; const [row, col] = selectedTile; const correct = userAnswer.trim().toUpperCase() === currentPuzzle.answer.toUpperCase(); const newBoard = [...board]; newBoard[row][col] = correct ? "player" : "miss"; setBoard(newBoard); setPlayerScore(score => score + (correct ? 10 : 0)); setCurrentPuzzle(null); setUserAnswer(""); setSelectedTile(null);

setTimeout(() => {
  autoplay();
}, 800);

};

const autoplay = () => { const emptyTiles = []; board.forEach((r, i) => r.forEach((cell, j) => { if (!cell) emptyTiles.push([i, j]); })); if (emptyTiles.length === 0) return; const [i, j] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]; const success = Math.random() > 0.3; const newBoard = [...board]; newBoard[i][j] = success ? "ai" : "miss"; setBoard(newBoard); setAiScore(score => score + (success ? 10 : 0)); };

return ( <div className="p-4 text-center"> <h1 className="text-3xl font-bold mb-4">MITO Minds</h1> <p className="mb-2">Player: {playerScore} $MITO | AI: {aiScore} $MITO</p> <div className="grid grid-cols-6 gap-2 justify-center"> {board.map((row, i) => row.map((cell, j) => ( <Card key={${i}-${j}} className={h-16 w-16 flex items-center justify-center cursor-pointer text-sm font-semibold ${ cell === "player" ? "bg-green-200" : cell === "ai" ? "bg-red-200" : cell === "miss" ? "bg-gray-200" : "bg-white hover:bg-blue-100" }} onClick={() => handleTileClick(i, j)} > <CardContent className="p-2">{cell ? cell.toUpperCase() : ""}</CardContent> </Card> )) )} </div>

{currentPuzzle && (
    <motion.div className="mt-4 p-4 bg-gray-100 rounded shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="mb-2 font-medium">Puzzle: {currentPuzzle.question}</p>
      <input
        className="border px-2 py-1 mr-2"
        placeholder="Your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <Button onClick={handleSubmitAnswer}>Submit</Button>
    </motion.div>
  )}

  {board.flat().every(cell => cell) && (
    <div className="mt-6 text-xl font-bold">
      Game Over! {playerScore > aiScore ? "You win!" : playerScore < aiScore ? "AI wins!" : "It's a draw!"}
    </div>
  )}
</div>

); }


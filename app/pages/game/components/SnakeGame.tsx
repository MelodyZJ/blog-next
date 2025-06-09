"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./snakeGame.module.css";
import GameOverModal from "./GameOverModal";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [isFirstGame, setIsFirstGame] = useState(true);

  // 生成随机食物位置
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // 确保食物不会生成在蛇身上
    if (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    ) {
      return generateFood();
    }
    return newFood;
  };

  // 检查碰撞
  const checkCollision = (head: { x: number; y: number }) => {
    // 检查是否撞墙
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    // 检查是否撞到自己
    return snake.some(
      (segment) => segment.x === head.x && segment.y === head.y
    );
  };

  // 游戏主循环
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake((currentSnake) => {
        const head = { ...currentSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // 检查碰撞
        if (checkCollision(head)) {
          setGameOver(true);
          clearInterval(gameLoop);
          // 更新最高分
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snakeHighScore", score.toString());
          }
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        // 检查是否吃到食物
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, score, highScore]);

  // 处理键盘输入
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case " ":
          if (!isFirstGame) {
            e.preventDefault(); // 阻止空格键的默认行为
            setIsPaused((prev) => !prev);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, isFirstGame]);

  // 加载最高分
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // 开始游戏
  const startGame = () => {
    setIsPaused(false);
    setIsFirstGame(false);
  };

  // 重置游戏
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
    setIsFirstGame(true);
  };

  // 绘制游戏
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制网格
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // 绘制蛇
    snake.forEach((segment, index) => {
      // 蛇头使用不同的颜色
      if (index === 0) {
        ctx.fillStyle = "#2E7D32";
      } else {
        // 蛇身使用渐变色
        const gradient = ctx.createLinearGradient(
          segment.x * CELL_SIZE,
          segment.y * CELL_SIZE,
          (segment.x + 1) * CELL_SIZE,
          (segment.y + 1) * CELL_SIZE
        );
        gradient.addColorStop(0, "#4CAF50");
        gradient.addColorStop(1, "#81C784");
        ctx.fillStyle = gradient;
      }

      // 绘制圆角矩形
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const size = CELL_SIZE - 1;
      const radius = 4;

      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
      ctx.lineTo(x + radius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    });

    // 绘制食物
    const foodGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2
    );
    foodGradient.addColorStop(0, "#FF5722");
    foodGradient.addColorStop(1, "#F4511E");
    ctx.fillStyle = foodGradient;

    // 绘制圆形食物
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.scoreBoard}>
        <div>当前分数: {score}</div>
        <div>最高分数: {highScore}</div>
        <div>
          状态: {gameOver ? "游戏结束" : isPaused ? "已暂停" : "进行中"}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className={styles.gameCanvas}
      />
      <div className={styles.controls}>
        {isFirstGame ? (
          <button onClick={startGame} className={styles.button}>
            开始游戏
          </button>
        ) : (
          <>
            <button onClick={resetGame} className={styles.button}>
              重新开始
            </button>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={styles.button}
            >
              {isPaused ? "继续" : "暂停"}
            </button>
          </>
        )}
      </div>
      {gameOver && <GameOverModal score={score} onRestart={resetGame} />}
    </div>
  );
};

export default SnakeGame;

import React, { useState, useEffect } from 'react';
import '../App.css';

export const ChatWindow = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingDots, setTypingDots] = useState<string>('.'); // New state for typing indicator

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setTypingDots((prev) => {
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '.';
        });
      }, 500); // Change dot every 500ms
    } else {
      setTypingDots('.'); // Reset dots when not loading
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [isLoading]);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      const userMessage = `You: ${input}`;
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      setIsLoading(true);

      setTimeout(() => {
        const lowerCaseInput = userMessage.substring(5).trim().toLowerCase();
        let botResponse = '';

        if (lowerCaseInput === 'czy 24 grudnia jest dniem wolnym od pracy?') {
          botResponse = "Prawbot: Tak, 24 grudnia (Wigilia Bożego Narodzenia) jest dniem ustawowo wolnym od pracy, zgodnie z polskim prawem.\n\nZmiana ta została wprowadzona na mocy Ustawy z dnia 6 grudnia 2024 r. o zmianie ustawy o dniach wolnych od pracy oraz niektórych innych ustaw. Ustawa ta została ogłoszona w Dzienniku Ustaw pod pozycją: Dz. U. z 2024 r. poz. 1965";
        } else {
          botResponse = `Prawbot: Tego jeszcze nie wiem, ale się uczę.`;
        }

        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-messages">
        <div className="chat-message-item">
          Prawbot: Jeśli masz jakieś pytanie z zakresu polskiego prawa, zapytaj mnie!
        </div>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message-item">
            {msg}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message-item bot-message">
            Prawbot is typing{typingDots}
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Ask about Polish law..."
          disabled={isLoading}
        />
        <button
          className="chat-send-button"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};



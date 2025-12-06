import React, { useState } from 'react';
import { Directive } from '../types';

type AddActProposalModalProps = {
  onClose: () => void;
  onSubmit: (newActProposal: Directive) => void;
};

export const AddActProposalModal: React.FC<AddActProposalModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [signaturesCollected, setSignaturesCollected] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActProposal: Directive = {
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      fileLink,
      signaturesCollected,
      creationDate: new Date().toISOString().split('T')[0], // Current date
      status: 'w toku', // Default status for new proposals
      currentStep: 1, // Default step
    };
    onSubmit(newActProposal);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Dodaj Nowy Projekt Ustawy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tytuł:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tagi (oddzielone przecinkami):</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileLink">Link do pliku (URL):</label>
            <input
              type="url"
              id="fileLink"
              value={fileLink}
              onChange={(e) => setFileLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signaturesCollected">Zebrane podpisy:</label>
            <input
              type="number"
              id="signaturesCollected"
              value={signaturesCollected}
              onChange={(e) => setSignaturesCollected(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Dodaj Projekt</button>
            <button type="button" onClick={onClose}>Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

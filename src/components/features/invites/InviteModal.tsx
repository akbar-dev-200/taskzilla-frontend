import { useState } from 'react';
import { X } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Select } from '@/components/common/Select';
import { SendInvitationsData } from '@/types/invite';
import { isValidEmail } from '@/utils/validators';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SendInvitationsData) => Promise<void>;
  teamId: string;
  isLoading?: boolean;
}

export const InviteModal = ({
  isOpen,
  onClose,
  onSubmit,
  teamId,
  isLoading = false,
}: InviteModalProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [role, setRole] = useState<string>('member');

  const addEmail = () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) return;

    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Invalid email address');
      return;
    }

    if (emails.includes(trimmedEmail)) {
      setEmailError('Email already added');
      return;
    }

    setEmails([...emails, trimmedEmail]);
    setEmailInput('');
    setEmailError('');
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emails.length === 0) {
      setEmailError('Please add at least one email');
      return;
    }

    try {
      await onSubmit({
        team_id: teamId,
        emails,
        role,
      });
      
      // Only reset and close if successful
      setEmails([]);
      setEmailInput('');
      setEmailError('');
      setRole('member');
      onClose();
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to send invitations:', error);
    }
  };

  const handleClose = () => {
    setEmails([]);
    setEmailInput('');
    setEmailError('');
    setRole('member');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Invite Team Members" size="md">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Addresses
          </label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="colleague@example.com"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setEmailError('');
              }}
              onKeyPress={handleKeyPress}
              error={emailError}
            />
            <Button type="button" onClick={addEmail}>
              Add
            </Button>
          </div>
        </div>

        {/* Email chips */}
        {emails.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            {emails.map((email) => (
              <Badge key={email} variant="info" className="flex items-center gap-2">
                {email}
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'member', label: 'Member' },
              { value: 'admin', label: 'Admin' },
              { value: 'lead', label: 'Lead' },
            ]}
          />
          <p className="text-xs text-gray-500 mt-1">
            Select the role for the invited members
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} disabled={emails.length === 0}>
            Send Invitations ({emails.length})
          </Button>
        </div>
      </form>
    </Modal>
  );
};

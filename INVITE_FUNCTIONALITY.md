# Invite Functionality Documentation

## Overview
The invite functionality allows team leads and admins to invite new members to their teams via email. Invitees receive invitations they can accept or decline, and team administrators can manage sent invitations.

## API Integration

### Backend Laravel Routes (Matched)
The frontend is fully integrated with your Laravel backend routes:

```php
// Send invitations (team admin/creator only)
POST /api/invites

// Accept invitation (authenticated users)
POST /api/invites/accept

// Decline invitation (authenticated users) - NEEDS TO BE ADDED TO BACKEND
POST /api/invites/decline

// Revoke invitation (only who sent it)
DELETE /api/invites/{inviteId}

// Get team invitations (team admin/creator only)
GET /api/invites/team/{teamId}

// Get my pending invitations
GET /api/invites/my-pending
```

## Frontend Implementation

### 1. API Endpoints (`src/api/endpoints/invites.ts`)
All backend routes are implemented:
- `sendInvitations()` - Send invitations to multiple emails
- `acceptInvitation()` - Accept an invitation using token
- `declineInvitation()` - Decline an invitation using token
- `revokeInvitation()` - Revoke a sent invitation
- `getTeamInvitations()` - Fetch team's invitations
- `getMyPendingInvitations()` - Fetch user's pending invitations

### 2. React Query Hooks (`src/hooks/useInvites.ts`)

#### Queries:
- `useMyPendingInvites()` - Fetches user's pending invitations
- `useTeamInvites(teamId)` - Fetches team's sent invitations

#### Mutations:
- `sendInvitations(data)` - Send invitations to team
- `acceptInvitation(data)` - Accept an invitation
- `declineInvitation(token)` - Decline an invitation
- `revokeInvitation(inviteId)` - Revoke a sent invitation

All mutations include:
- Automatic query invalidation
- Success/error toast notifications
- Loading states

### 3. Components

#### `InviteModal` (`src/components/features/invites/InviteModal.tsx`)
- Add multiple email addresses
- Validate emails before adding
- Remove emails from list
- Submit invitations for a team
- Shows email chips/badges for added emails

**Usage:**
```tsx
<InviteModal
  isOpen={showInviteModal}
  onClose={() => setShowInviteModal(false)}
  onSubmit={sendInvitations}
  teamId={teamUuid}
  isLoading={isSending}
/>
```

#### `InviteCard` (`src/components/features/invites/InviteCard.tsx`)
- Display invitation details (team name, inviter, email, expiry)
- Accept/Decline buttons with loading states
- Role badge display
- Handles missing/undefined roles gracefully

**Usage:**
```tsx
<InviteCard
  invite={invite}
  onAccept={handleAccept}
  onDecline={handleDecline}
  isAccepting={isAccepting}
  isDeclining={isDeclining}
/>
```

#### `TeamInvitesList` (`src/components/features/invites/TeamInvitesList.tsx`)
- Display all invitations sent for a team
- Status badges (pending, accepted, rejected, expired)
- Revoke pending invitations
- Shows invitee email, sent date, expiry date
- Empty state when no invitations

**Usage:**
```tsx
<TeamInvitesList
  teamId={teamUuid}
  invites={teamInvites}
  isLoading={invitesLoading}
  onRevoke={revokeInvitation}
  isRevoking={isRevoking}
/>
```

### 4. Pages

#### `MyInvites` (`src/pages/invites/MyInvites.tsx`)
**Route:** `/invites`

Features:
- View all pending team invitations
- Accept invitations with confirmation
- Decline invitations with confirmation dialog
- Empty state when no pending invitations
- Grid layout for multiple invitations

#### `TeamDetails` - Invitations Tab
**Route:** `/teams/:uuid` (Invitations tab)

Features:
- View all invitations sent for the team
- See invitation status (pending, accepted, rejected, expired)
- Revoke pending invitations
- Send new invitations via modal
- Empty state with call-to-action

## User Flow

### Sending Invitations
1. Team lead/admin navigates to Team Details page
2. Clicks "Invite" button or "Invitations" tab
3. Enters email addresses in modal (multiple supported)
4. Submits invitations
5. Backend sends email notifications (handled by Laravel)

### Receiving & Accepting Invitations
1. User receives email with invitation link (backend)
2. User logs in and navigates to "My Invitations" (`/invites`)
3. User sees pending invitation with team details
4. User clicks "Accept" or "Decline"
5. On accept: User joins team, invitation marked as accepted
6. On decline: Invitation marked as rejected

### Managing Sent Invitations
1. Team lead/admin goes to Team Details > Invitations tab
2. Views all sent invitations with status
3. Can revoke pending invitations if needed
4. Sees accepted/rejected/expired invitations

## Data Types

### Invite Type (`src/types/invite.ts`)
```typescript
interface Invite {
  id: string;
  team_id: string;
  team?: Team;
  inviter_id: string;
  inviter?: User;
  invitee_email: string;
  invitee_id?: string;
  invitee?: User;
  role?: string; // Optional: 'lead', 'admin', 'member'
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
```

## Error Handling

All invite operations include:
- ✅ Toast notifications for success/error
- ✅ Validation errors displayed inline
- ✅ Loading states during async operations
- ✅ Graceful handling of missing data (optional fields)
- ✅ Network error handling via API client interceptor
- ✅ 401 (Unauthorized) auto-redirects to login
- ✅ 403 (Forbidden) error messages

## Features Implemented

✅ Send multiple invitations at once
✅ Accept invitations
✅ Decline invitations with confirmation
✅ Revoke sent invitations
✅ View pending invitations (My Invites page)
✅ View team invitations (Team Details page)
✅ Email validation before sending
✅ Role badges display
✅ Status badges (pending, accepted, rejected, expired)
✅ Expiry date display
✅ Empty states for no invitations
✅ Loading states for all operations
✅ Error handling with toast notifications
✅ Automatic query cache invalidation
✅ Responsive design

## Backend Requirements

⚠️ **IMPORTANT:** You need to add this route to your Laravel backend:

```php
// Add to routes/api.php inside the auth:sanctum middleware group
Route::post('/invites/decline', [InviteController::class, 'declineInvitation'])
    ->name('invite.decline');
```

And implement the `declineInvitation` method in your `InviteController`:

```php
public function declineInvitation(Request $request)
{
    $request->validate([
        'token' => 'required|string',
    ]);

    $invite = Invite::where('token', $request->token)
        ->where('invitee_email', auth()->user()->email)
        ->where('status', 'pending')
        ->firstOrFail();

    $invite->update([
        'status' => 'rejected',
        'invitee_id' => auth()->id(),
    ]);

    return response()->json([
        'message' => 'Invitation declined successfully',
    ]);
}
```

## Testing Checklist

- [ ] Send invitation to valid email
- [ ] Send multiple invitations at once
- [ ] Try to send invitation with invalid email (should show error)
- [ ] View pending invitations in My Invites page
- [ ] Accept an invitation
- [ ] Decline an invitation
- [ ] Revoke a sent invitation
- [ ] View team invitations in Team Details
- [ ] Check status badges display correctly
- [ ] Check expired invitations show expired status
- [ ] Verify toast notifications appear for all operations
- [ ] Test error handling (network errors, validation errors)
- [ ] Check responsive design on mobile/tablet

## Navigation

Users can access invitations via:
1. **My Invitations:** Sidebar navigation → "Invitations" or direct URL `/invites`
2. **Team Invitations:** Team Details page → "Invitations" tab
3. **Send Invitations:** Team Details page → "Invite" button (top right) or "Invitations" tab → "Send Invitations" button

## Notes

- Invitations expire based on `expires_at` timestamp from backend
- Only pending invitations can be revoked
- Only pending invitations show Accept/Decline buttons
- Role is optional and defaults to "Member" if not specified
- All invite operations require authentication
- Team invitations list is only accessible to team admins/leads (enforced by backend)

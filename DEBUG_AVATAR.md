# 🔍 Avatar Debug Guide

## Quick Debug Steps

### **1. Check Browser Console**

Open your browser's DevTools (F12) and check the console for these messages:

```
Header - User Data: { name: "...", avatar_url: "...", hasUser: true }
```

### **2. Check localStorage**

In DevTools Console, run:
```javascript
// Check stored user data
JSON.parse(localStorage.getItem('auth_user'))

// Check Zustand persist store
JSON.parse(localStorage.getItem('taskzilla-auth'))
```

**Expected Output:**
```json
{
  "id": "123",
  "name": "Muhammad Akbar",
  "email": "akbar@example.com",
  "avatar_url": "/storage/avatars/user.jpg",
  "created_at": "2024-01-01",
  "updated_at": "2024-01-01"
}
```

### **3. Check Backend Response**

In DevTools Network tab:
1. Find the `/api/login` request
2. Check the Response
3. Verify `avatar_url` is present in the response

**Expected Response:**
```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Muhammad Akbar",
      "email": "akbar@example.com",
      "avatar_url": "/storage/avatars/akbar.jpg"
    },
    "token": "..."
  }
}
```

---

## Common Issues & Fixes

### **Issue 1: avatar_url is null or undefined**

**Cause:** Backend not returning avatar_url

**Fix in Backend:**
```php
// Laravel Controller - Login Response
return response()->json([
    'data' => [
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar_url' => $user->avatar ? Storage::url($user->avatar) : null,
        ],
        'token' => $token,
    ]
]);
```

### **Issue 2: avatar_url is relative path but not loading**

**Example:** `avatar_url: "/storage/avatars/user.jpg"`

**The Avatar component automatically converts this to:**
```
http://127.0.0.1:8002/storage/avatars/user.jpg
```

**If it's not working, check:**
1. Backend URL in `.env`: `VITE_API_URL=http://127.0.0.1:8002/api`
2. File exists on backend
3. Storage is publicly accessible

### **Issue 3: Avatar shows initials instead of image**

**Reasons:**
1. Image URL is broken (404)
2. CORS issue (check browser console)
3. Image failed to load

**Debug in Console:**
```
Avatar Debug - Invalid URL: { src: "...", name: "..." }
Failed to load avatar image: ...
```

---

## Quick Test Solutions

### **Test 1: Use Placeholder Service**

Update your backend to use a placeholder avatar:

```php
// Temporary test
'avatar_url' => "https://ui-avatars.com/api/?name=" . urlencode($user->name) . "&background=7c3aed&color=fff&size=128"
```

This should work immediately and show an avatar.

### **Test 2: Clear All Data & Re-login**

In DevTools Console:
```javascript
// Clear everything
localStorage.clear();
sessionStorage.clear();

// Refresh page
location.reload();

// Re-login
```

### **Test 3: Force Avatar URL**

In DevTools Console (after login):
```javascript
// Get current auth data
const auth = JSON.parse(localStorage.getItem('taskzilla-auth'));

// Add avatar URL
auth.state.user.avatar_url = "https://i.pravatar.cc/150?img=12";

// Save back
localStorage.setItem('taskzilla-auth', JSON.stringify(auth));

// Refresh
location.reload();
```

---

## Verify Avatar Component is Working

### **Test in Browser Console:**

```javascript
// Check if Avatar component receives data
// Look for Header component rendering
const headerElement = document.querySelector('header');
console.log('Header exists:', !!headerElement);

// Check if avatar is rendered
const avatarElement = document.querySelector('.rounded-full');
console.log('Avatar element:', avatarElement);
console.log('Avatar has image:', !!avatarElement?.querySelector('img'));
```

---

## Backend Checklist

Make sure your Laravel backend:

- [ ] Returns `avatar_url` in login response
- [ ] Returns `avatar_url` in register response (if auto-login)
- [ ] `avatar_url` is a full URL or starts with `/`
- [ ] Storage is publicly accessible: `php artisan storage:link`
- [ ] CORS allows requests from frontend
- [ ] Images are in `storage/app/public/avatars/`

---

## Frontend Checklist

- [ ] `.env` file has correct `VITE_API_URL`
- [ ] User type includes `avatar_url?: string`
- [ ] authStore saves user data with avatar_url
- [ ] Avatar component receives `src` prop
- [ ] Browser console shows no errors

---

## Force Reload User Data

If you want to ensure fresh data, add this to your app:

```typescript
// In authStore.ts, add this method:
refreshUser: async () => {
  const token = get().token;
  if (!token) return;
  
  try {
    // Fetch fresh user data from backend
    const response = await apiClient.get('/user');
    const user = response.data.data;
    
    // Update store and localStorage
    storage.set(AUTH_USER_KEY, user);
    set({ user });
  } catch (error) {
    console.error('Failed to refresh user:', error);
  }
}
```

---

## Expected Console Output (Working State)

When everything works, you should see:
```
Header - User Data: {
  name: "Muhammad Akbar",
  avatar_url: "/storage/avatars/akbar.jpg",
  hasUser: true
}
```

And NO error messages like:
- ❌ "Failed to load avatar image"
- ❌ "Avatar Debug - Invalid URL"
- ❌ CORS errors
- ❌ 404 errors for image

---

## Still Not Working?

### Check This:

1. **Open Network Tab** → Filter by "Img" → See if avatar image is being requested
2. **Check the URL** being requested for the avatar
3. **Copy that URL** and paste in browser address bar
4. **See the response** - 404? CORS? File not found?

### Common URL Issues:

```
❌ http://127.0.0.1:8002/api/storage/avatars/user.jpg (Wrong - has /api)
✅ http://127.0.0.1:8002/storage/avatars/user.jpg (Correct)

❌ /api/storage/avatars/user.jpg (Wrong path)
✅ /storage/avatars/user.jpg (Correct)
```

---

## Success! 🎉

When working correctly, you should see:
- ✅ User's profile picture in header (top right)
- ✅ Smooth image loading with fade-in
- ✅ No console errors
- ✅ Image loads on all pages

**Your avatar system is now fully functional!**

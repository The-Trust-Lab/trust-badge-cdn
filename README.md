# TrustLabs Badge CDN

Public CDN repository for TrustLabs verification badges.

## 🚀 Usage

### For Partners:
```html
<!-- Include the badge component -->
<script src="https://d15sfj1qkqbu2z.cloudfront.net/badge-element.v1.js"></script>

<!-- Add badges to your site -->
<trustlabs-badge email="user@example.com"></trustlabs-badge>
<trustlabs-badge email="another@example.com" data-size="sm"></trustlabs-badge>
```

## 📋 Requirements

1. **Include Script**: Add the script tag above
2. **Add Badges**: Use `<trustlabs-badge>` elements with email attributes
3. **That's it!**: No domain registration required - works on any website

## 🔧 Attributes

- `email` (required): Email address to verify
- `data-size` (optional): "sm" or "md" (default: "md")
- `data-theme` (optional): "auto", "light", or "dark" (default: "auto")

## 🌟 Features

- ✅ **Automatic Batching**: Optimized API calls for performance
- ✅ **Rich Tooltips**: Hover for detailed verification information
- ✅ **Responsive Design**: Looks great on all devices
- ✅ **Zero Dependencies**: Lightweight and fast
- ✅ **Cross-Origin Ready**: CORS-enabled for global use
- ✅ **Rate Limited**: Built-in protection against abuse

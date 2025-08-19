# TrustLabs Badge CDN

Public CDN repository for TrustLabs verification badges.

## 🚀 Usage

### URL Options:

**Main Branch (Latest):**
```
https://cdn.jsdelivr.net/gh/The-Trust-Lab/trust-badge-cdn@main/dist/badge-element.v1.js
```

**Specific Version (Commit Hash):**
```
https://cdn.jsdelivr.net/gh/The-Trust-Lab/trust-badge-cdn@63d7adb/dist/badge-element.v1.js
```

**Cache Busting (Add version parameter):**
```
https://cdn.jsdelivr.net/gh/The-Trust-Lab/trust-badge-cdn@main/dist/badge-element.v1.js?v=2
```

### For Partners:
```html
<!-- Include the badge component -->
<!-- Latest version (main branch) -->
<script src="https://cdn.jsdelivr.net/gh/The-Trust-Lab/trust-badge-cdn@main/dist/badge-element.v1.js"></script>

<!-- Specific version (commit hash) - for immediate updates -->
<script src="https://cdn.jsdelivr.net/gh/The-Trust-Lab/trust-badge-cdn@63d7adb/dist/badge-element.v1.js"></script>

<!-- Add badges to your site -->
<trustlabs-badge email="user@example.com"></trustlabs-badge>
<trustlabs-badge email="another@example.com" data-size="sm"></trustlabs-badge>
```

## 📋 Requirements

1. **Domain Registration**: Contact TrustLabs to register your domain
2. **Include Script**: Add the script tag above
3. **Add Badges**: Use `<trustlabs-badge>` elements with email attributes

## 🔧 Attributes

- `email` (required): Email address to verify
- `data-size` (optional): "sm" or "md" (default: "md")
- `data-theme` (optional): "auto", "light", or "dark" (default: "auto")

## 🌟 Features

- ✅ Automatic batching for performance
- ✅ Hover tooltips with verification details
- ✅ Responsive design
- ✅ No dependencies
- ✅ Cross-origin ready

---
description: Commit all changes and deploy to Vercel production
---

// turbo-all

1. Stage all changes
```
git add -A
```

2. Commit with a message (replace MESSAGE with actual commit message)
```
git commit -m "MESSAGE"
```

3. Push to GitHub main branch
```
git push origin main
```

4. Deploy to Vercel production
```
vercel --prod --yes
```

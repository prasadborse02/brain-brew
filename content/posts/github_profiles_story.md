---
title: Tale of 2 GitHub Accounts
date: 2025-06-08T12:31:00-00:00
draft: false
tags:
  - github
  - ssh
---

> Posted this on medium: https://medium.com/@prasad-borse/the-tale-of-two-github-accounts-a-developers-journey-to-multi-profile-mastery-72e9741b737d

# The Tale of Two GitHub Accounts: A Developer's Journey to Multi-Profile Mastery

*How I learned to stop worrying and love having separate work and personal GitHub accounts on the same machine*

## The Problem That Started It All

Picture this: It's Monday morning, you're sipping your coffee, and you're about to push some code to your personal project. You type `git push`, hit enter, and... disaster. Your commit just went live with your work email address attached to your weekend hobby project. Your colleagues can now see that you spent Saturday night building a "Cat Meme Generator 3000."

Sound familiar? 

As developers, we often wear multiple hats. We have our professional GitHub account for work projects and our personal account for side projects, open-source contributions, and those experimental repos we don't want our boss to know about. But managing both on the same machine? That's where things get tricky.

## The Journey Begins: Understanding the Challenge

When I first encountered this problem, I thought, "How hard could it be?" I'll just switch my git config when I need to, right? 

```bash
git config user.email "personal@email.com"  # For personal repos
git config user.email "work@company.com"    # For work repos
```

But here's what I quickly discovered:
1. I constantly forgot to switch configs
2. SSH keys were a mess - which key was being used for which account?
3. I had commits scattered across both accounts with the wrong identity
4. Collaborators couldn't find my contributions because they were split between accounts

There had to be a better way.

## Discovery: The Two Pillars of Multi-Account Management

After some research and a few embarrassing commit mishaps, I discovered that the solution lies in two key areas:

1. **SSH Key Management**: Teaching your machine which key to use for which GitHub account
2. **Git Configuration**: Automatically setting the right name and email based on where you're working

Let me walk you through how I solved this, step by step.

## Chapter 1: The SSH Key Revolution

First, I needed to understand that GitHub identifies you by your SSH key, not your git config. Each account needs its own unique key.

### Creating Separate Identities

```bash
# Generate key for personal account
ssh-keygen -t ed25519 -C "personal@email.com" -f ~/.ssh/id_ed25519_personal

# Generate key for work account  
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_ed25519_work
```

The `-f` flag was crucial here - it tells SSH to save the key with a custom name instead of overwriting the default `id_rsa`.

### Adding Keys to GitHub

Next, I copied each public key to its respective GitHub account:

```bash
# Copy personal key
cat ~/.ssh/id_ed25519_personal.pub | pbcopy

# Copy work key
cat ~/.ssh/id_ed25519_work.pub | pbcopy
```

Then I added each key to the appropriate GitHub account in Settings → SSH and GPG keys.

### The SSH Config Magic

Here's where the real magic happens. I created an SSH config file that tells my machine which key to use for which scenario:

```bash
# ~/.ssh/config

# Default GitHub (work profile)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Personal GitHub account (use when needed)
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes
```

This configuration was a game-changer. Now I could:
- Use `git@github.com:username/repo.git` for work (default behavior)
- Use `git@github.com-personal:username/repo.git` for personal projects

## Chapter 2: The Git Config Enlightenment

SSH keys solved authentication, but I still needed to handle commit identity. I wanted work to be my default (since that's where I spend most of my time), but personal projects should automatically use my personal identity.

### Setting the Default

```bash
# Work profile as global default
git config --global user.name "Prasad Borse"
git config --global user.email "prasad.borse@company.com"
```

### The Conditional Include Discovery

This is where Git's conditional includes became my best friend. I could tell Git: "If I'm working in this specific directory, use a different config."

```bash
# Automatically use personal config for personal projects
git config --global includeIf."gitdir:~/dev/personal-projects/".path "~/.gitconfig-personal"
```

Then I created the personal config:

```bash
# ~/.gitconfig-personal
[user]
    name = Prasad Borse
    email = prasad@personal-email.com
```

## Chapter 3: The Perfect Workflow

With both pieces in place, my workflow became seamless:

### For Work Projects (Default Behavior)
```bash
# Clone normally - uses work SSH key and work git config
git clone git@github.com:company/awesome-project.git
cd awesome-project
git log --oneline -1  # Shows: "Prasad Borse <prasad.borse@company.com>"
```

### For Personal Projects
```bash
# Clone with personal host - automatically uses personal git config in designated directories
cd ~/dev/personal-projects
git clone git@github.com-personal:prasad/cat-meme-generator.git
cd cat-meme-generator
git log --oneline -1  # Shows: "Prasad Borse <prasad@personal-email.com>"
```

### For Existing Repositories
If I had an existing repo that needed to switch profiles:

```bash
# Switch to personal
git remote set-url origin git@github.com-personal:prasad/repo.git

# Or switch to work (though this is usually the default)
git remote set-url origin git@github.com:company/repo.git
```

## The Plot Twist: An Even Better Solution

After living with this setup for a while, I realized I could make it even more elegant. Instead of remembering special directory names, I could configure specific existing directories:

```bash
# Make my existing project directory use personal profile
git config --global includeIf."gitdir:~/dev/airunner/".path "~/.gitconfig-personal"
```

Now my `airunner` project (a personal side project) automatically uses my personal GitHub profile, while everything else defaults to work.

## The Happy Ending: Benefits Realized

This setup transformed my development experience:

1. **No More Mistakes**: Commits automatically have the right identity
2. **Seamless Switching**: No manual config changes needed
3. **Clean Separation**: Work and personal contributions are properly attributed
4. **Minimal Overhead**: Set it once, forget about it
5. **Flexibility**: Can easily add more personal directories or manually override when needed

## Your Turn: Implementing This Solution

If you're facing the same challenge, here's your quick-start guide:

1. **Generate separate SSH keys** for each account
2. **Add each key** to its respective GitHub account
3. **Configure SSH** to use work as default, personal as option
4. **Set work git config** as global default
5. **Create personal git config** for specific directories
6. **Test both setups** to ensure they work correctly

## Conclusion: The Developer's Peace of Mind

Managing multiple GitHub accounts doesn't have to be a source of stress. With the right setup, you can seamlessly switch between your professional and personal development worlds without thinking about it.

The key insight is that this isn't just about technical configuration - it's about creating a workflow that matches how you actually work. Most of us spend the majority of our time on work projects, so making that the default makes sense. Personal projects become the special case that gets handled automatically.

Now, when I push that late-night commit to my "Cat Meme Generator 3000," I can rest easy knowing it's properly attributed to my personal account. And my Monday morning work commits? They go exactly where they should, keeping my professional and personal development lives neatly separated.

*Ready to implement this solution? Start with generating those SSH keys and take it step by step. Your future self will thank you when you never again have to explain why your work email is attached to a repository called "awesome-pizza-tracker."*

---

*Have you implemented a similar solution? Found other approaches that work well? I'd love to hear about your experiences in the comments below.*
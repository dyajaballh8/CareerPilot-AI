# Phase 1 UI wireframes

These wireframes describe the implemented responsive screens and can be recreated in Figma without changing the product behavior.

## Auth

A two-column card on desktop becomes one column on mobile. The left panel carries the CareerPilot message and sage background; the right panel contains email, password, submit, and register/login switch.

## Overview

The desktop layout has a fixed sidebar and a content canvas. The top area contains the greeting and primary course action. A wide sage content block introduces the next step, followed by three metrics and a row of recommended course cards. Mobile collapses the sidebar and stacks the cards.

## Explore courses

The page starts with a rounded search field, then category filter pills, then a responsive grid of course cards. Each card includes category, save action, title, provider, duration, price, and level. Search is traditional keyword filtering in Phase 1.

## My learning

The same course-card component is reused for saved courses. Empty state copy directs the user back to Explore courses.

## My resume

A two-column panel contains the upload drop zone and latest-file status. The upload accepts PDF/DOCX and exposes replace/remove actions. On mobile the columns stack.

## Profile

The profile screen contains avatar, full name, email, career focus, and a save action. Account fields are prepared for API-backed updates.

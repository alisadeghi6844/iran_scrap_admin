# Design Document

## Overview

This design document outlines the comprehensive rebranding strategy for transforming the project from "digifarm" to "iranscrap". The rebranding involves systematic text replacement across all files, updating the color scheme to use `#64748b` (slate-500) as primary and `#f97316` (orange-500) as secondary colors, and ensuring consistency across all user-facing elements.

## Architecture

### Text Replacement Strategy

The rebranding will follow a systematic approach to replace all instances of the old brand name:

1. **Case-sensitive replacements**:
   - `digifarm` → `iranscrap`
   - `DigiFarm` → `IranScrap`
   - `DIGIFARM` → `IRANSCRAP`

2. **Persian text replacements**:
   - `دیجی فارم` → `ایران اسکرپ`
   - `دیجیفارم` → `ایران‌اسکرپ`
   - `دیجی‌فارم` → `ایران‌اسکرپ`

3. **Configuration updates**:
   - Package.json name field
   - HTML title tags
   - Meta descriptions
   - Alt text attributes

### Color Scheme Implementation

The new color palette will be implemented through:

1. **Tailwind CSS Configuration**:
   - Update primary color palette to use `#64748b` as the base
   - Update secondary/accent colors to use `#f97316`
   - Maintain existing color variations (50-900 scale)

2. **CSS Custom Properties**:
   - Define CSS variables for consistent color usage
   - Ensure backward compatibility with existing styles

## Components and Interfaces

### File Categories for Updates

1. **Configuration Files**:
   - `package.json` - Update name field
   - `index.html` - Update title and meta tags
   - `tailwind.config.js` - Update color scheme

2. **Source Code Files**:
   - TypeScript interfaces and types
   - React components with hardcoded text
   - Authentication pages with branding
   - Theme configuration files

3. **Documentation Files**:
   - `README.md` - Update project description
   - `SURVEY_SYSTEM_README.md` - Update system references

### Affected Components

Based on the search results, the following components require updates:

1. **Authentication Components**:
   - `src/page/auth/Login/index.tsx` - Login page title and alt text
   
2. **Theme Components**:
   - `src/container/themes/MainTheme.tsx` - Document title setting

3. **Type Definitions**:
   - `src/types/OrderItem.ts` - Shipping object property names
   - Order-related components that reference shipping properties

4. **Order Management**:
   - `src/page/pendingOrdersFinancial/index.tsx`
   - `src/container/features/order/OrderDetailsModal.tsx`
   - `src/container/features/order/PendingOrdersTable.tsx`

## Data Models

### Color Configuration Model

```typescript
interface ColorPalette {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string; // #64748b - Main primary color
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    DEFAULT: string; // #f97316 - Main secondary color
    // ... other variations
  };
}
```

### Text Replacement Model

```typescript
interface BrandingReplacement {
  oldText: string;
  newText: string;
  caseSensitive: boolean;
  language: 'en' | 'fa';
}
```

## Error Handling

### Validation Strategy

1. **Pre-replacement Validation**:
   - Backup critical configuration files
   - Validate color hex codes
   - Check for syntax errors in configuration files

2. **Post-replacement Verification**:
   - Ensure all text replacements are contextually appropriate
   - Verify color contrast ratios meet accessibility standards
   - Test build process after changes

3. **Rollback Strategy**:
   - Maintain backup of original files
   - Document all changes for easy reversal
   - Test functionality after each major change

### Risk Mitigation

1. **False Positive Replacements**:
   - Review each replacement in context
   - Avoid replacing text within URLs or API endpoints
   - Preserve technical identifiers that shouldn't change

2. **Color Accessibility**:
   - Ensure new colors meet WCAG contrast requirements
   - Test with color blindness simulators
   - Maintain sufficient contrast for text readability

## Testing Strategy

### Manual Testing Checklist

1. **Visual Verification**:
   - Login page displays correct branding
   - All Persian text uses appropriate terminology
   - Color scheme is consistently applied

2. **Functional Testing**:
   - Build process completes successfully
   - No broken imports or references
   - Application starts and functions normally

3. **Cross-browser Testing**:
   - Verify color rendering across browsers
   - Test responsive design with new colors
   - Ensure text rendering is correct

### Automated Testing

1. **Build Verification**:
   - Ensure TypeScript compilation succeeds
   - Verify no linting errors introduced
   - Check that all imports resolve correctly

2. **Color Validation**:
   - Automated contrast ratio checking
   - CSS validation for color values
   - Accessibility audit with new color scheme

## Implementation Phases

### Phase 1: Configuration Updates
- Update package.json
- Update HTML meta information
- Update Tailwind color configuration

### Phase 2: Text Replacements
- Replace English branding text
- Replace Persian branding text
- Update component-specific text

### Phase 3: Color Implementation
- Apply new primary color scheme
- Apply new secondary color scheme
- Update any hardcoded color values

### Phase 4: Verification
- Manual testing of all changes
- Build verification
- Documentation updates

## Design Decisions and Rationales

### Color Choice Rationale

1. **Primary Color (#64748b - Slate-500)**:
   - Professional and modern appearance
   - Good contrast with white backgrounds
   - Suitable for business applications

2. **Secondary Color (#f97316 - Orange-500)**:
   - Provides good accent color
   - Creates visual hierarchy
   - Complements the slate primary color

### Text Replacement Strategy

1. **Contextual Awareness**:
   - Each replacement will be reviewed in context
   - Technical identifiers preserved where appropriate
   - User-facing text prioritized for replacement

2. **Language Considerations**:
   - Persian text will use appropriate spacing and characters
   - Maintain RTL text direction support
   - Ensure cultural appropriateness of new branding
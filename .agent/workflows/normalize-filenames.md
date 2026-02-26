---
description: Normalize all filenames in a directory (lowercase, no accents, space to hyphen)
---

This workflow helps you rename files in a directory to follow a standard: lowercase, no accents, and hyphens instead of spaces.

1. The tool is located at `d:\UN-Cao dang kien truc xay dung TPHCM-20250331T094102Z-001\BANNER MOBILE HSJ\BANNER MOBILE 390x750\normalize-files.js`.
2. Run the tool using Node.js from the command line.

// turbo
3. **Dry Run**: Preview the changes first without renaming:
   ```powershell
   node "d:\UN-Cao dang kien truc xay dung TPHCM-20250331T094102Z-001\BANNER MOBILE HSJ\BANNER MOBILE 390x750\normalize-files.js" . --dry-run
   ```

// turbo
4. **Execute**: Rename the files for real:
   ```powershell
   node "d:\UN-Cao dang kien truc xay dung TPHCM-20250331T094102Z-001\BANNER MOBILE HSJ\BANNER MOBILE 390x750\normalize-files.js" .
   ```

Note: You can replace `.` with any absolute path to target a specific folder.

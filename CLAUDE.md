# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PowerPoint (PPTX) presentation workspace with tools for creating, editing, and analyzing presentations using both Node.js and Python.

## Commands

### Dependencies

```bash
# Node.js dependencies (pptxgenjs, playwright, sharp)
pnpm install

# Python dependencies (python-pptx, Pillow, six)
pip install -r requirements.txt
```

### Creating Presentations (html2pptx workflow)

```bash
# Run a presentation generation script
NODE_PATH=./node_modules node projects/<project>/generate.js
```

### Working with Templates

```bash
# Rearrange slides from template
python .claude/skills/pptx/scripts/rearrange.py template.pptx output.pptx 0,3,5,3

# Extract text inventory
python .claude/skills/pptx/scripts/inventory.py presentation.pptx inventory.json

# Replace text in presentation
python .claude/skills/pptx/scripts/replace.py input.pptx replacements.json output.pptx

# Create thumbnail grid
python .claude/skills/pptx/scripts/thumbnail.py presentation.pptx [output_prefix] [--cols 4]
```

### OOXML Operations

```bash
# Unpack PPTX to XML
python .claude/skills/pptx/ooxml/scripts/unpack.py presentation.pptx output_dir

# Validate unpacked presentation
python .claude/skills/pptx/ooxml/scripts/validate.py output_dir --original presentation.pptx

# Pack XML back to PPTX
python .claude/skills/pptx/ooxml/scripts/pack.py input_dir output.pptx
```

## Architecture

### Directory Structure

- `.claude/skills/pptx/` - Claude Code skill for PPTX operations
  - `scripts/` - Python scripts for template-based workflows (inventory, replace, rearrange, thumbnail)
  - `ooxml/scripts/` - Low-level OOXML manipulation (pack, unpack, validate)
  - `SKILL.md` - Main skill documentation (read this for detailed workflows)
  - `html2pptx.md` - HTML to PowerPoint conversion guide
  - `ooxml.md` - Office Open XML technical reference
- `projects/` - Individual presentation projects with HTML slides and generation scripts
- `node_modules/` - Node.js dependencies (pptxgenjs, playwright, sharp)

### Two Main Workflows

1. **html2pptx (Creating New)**: Write HTML slides → Convert to PPTX using html2pptx.js library → Add charts/tables with PptxGenJS

2. **Template-based (Editing Existing)**: Rearrange template slides → Extract text inventory → Generate replacement JSON → Apply replacements

### Key Technologies

- **Node.js**: pptxgenjs (PPTX generation), playwright (HTML rendering), sharp (image processing)
- **Python**: python-pptx (PPTX manipulation), Pillow (image processing)

## Skill Documentation

The `.claude/skills/pptx/SKILL.md` file contains comprehensive documentation for:
- Reading/analyzing presentations
- Creating presentations from scratch (html2pptx workflow)
- Editing existing presentations (OOXML workflow)
- Using templates (rearrange, inventory, replace workflow)
- Design principles and color palettes

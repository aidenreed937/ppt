# PPTX Presentation Workspace

PowerPoint (PPTX) 演示文稿工具集，支持使用 Node.js 和 Python 创建、编辑和分析演示文稿。

## 功能特性

- **html2pptx**: 将 HTML 幻灯片转换为 PowerPoint 演示文稿
- **模板操作**: 重排幻灯片、提取文本、批量替换内容
- **OOXML 操作**: 底层 XML 解包、验证和重新打包

## 安装

```bash
# Node.js 依赖
pnpm install

# Python 依赖
pip install -r requirements.txt
```

## 快速开始

### 创建演示文稿 (html2pptx)

```bash
NODE_PATH=./node_modules node projects/<project>/generate.js
```

### 模板操作

```bash
# 重排幻灯片
python .claude/skills/pptx/scripts/rearrange.py template.pptx output.pptx 0,3,5,3

# 提取文本清单
python .claude/skills/pptx/scripts/inventory.py presentation.pptx inventory.json

# 替换文本
python .claude/skills/pptx/scripts/replace.py input.pptx replacements.json output.pptx

# 生成缩略图
python .claude/skills/pptx/scripts/thumbnail.py presentation.pptx [output_prefix] [--cols 4]
```

### OOXML 操作

```bash
# 解包 PPTX
python .claude/skills/pptx/ooxml/scripts/unpack.py presentation.pptx output_dir

# 验证
python .claude/skills/pptx/ooxml/scripts/validate.py output_dir --original presentation.pptx

# 重新打包
python .claude/skills/pptx/ooxml/scripts/pack.py input_dir output.pptx
```

## 项目结构

```
.
├── .claude/skills/pptx/     # PPTX 工具集
│   ├── scripts/             # Python 脚本 (inventory, replace, rearrange, thumbnail)
│   ├── ooxml/scripts/       # OOXML 操作脚本 (pack, unpack, validate)
│   └── *.md                 # 文档
├── projects/                # 演示文稿项目
└── requirements.txt         # Python 依赖
```

## 技术栈

- **Node.js**: pptxgenjs, playwright, sharp
- **Python**: python-pptx, Pillow

## License

MIT

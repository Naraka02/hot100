const files = [
  { name: "01 Hash To Matrix", path: "./01_hash_to_matrix.md" },
  { name: "02 Linked List To Graph", path: "./02_linked_list_to_graph.md" },
  { name: "03 Backtracking To Heap", path: "./03_backtracking_to_heap.md" },
  { name: "04 Greedy To Tricks", path: "./04_greedy_to_tricks.md" },
];

const briefMap = {
  1: "给定数组和目标值，找出两个和为目标值的下标。",
  2: "把互为字母异位词的字符串分到同一组。",
  3: "在无序数组中找出最长连续整数序列长度。",
  4: "原地把所有 0 移到末尾，并保持非零元素顺序。",
  5: "从若干竖线中选两条，形成最大盛水面积。",
  6: "找出数组中所有和为 0 的不重复三元组。",
  7: "根据柱子高度，计算下雨后能接多少雨水。",
  8: "求不含重复字符的最长子串长度。",
  9: "找到字符串中所有与模式串同字母组成的子串起点。",
  10: "统计和恰好等于 k 的连续子数组个数。",
  11: "对每个长度为 k 的窗口，求窗口最大值。",
  12: "在字符串中找出包含目标串全部字符的最短子串。",
  13: "求连续子数组的最大和。",
  14: "合并所有有重叠部分的区间。",
  15: "把数组向右轮转 k 步。",
  16: "返回除当前位置外其余元素乘积组成的数组。",
  17: "在线性时间和常数空间内找出缺失的最小正整数。",
  18: "如果矩阵某元素为 0，则将其所在行列全部置 0。",
  19: "按螺旋顺序输出矩阵元素。",
  20: "将 n x n 矩阵顺时针旋转 90 度。",
  21: "在行列均递增的矩阵中查找目标值。",
  22: "找出两条单链表首次相交的节点。",
  23: "反转单链表。",
  24: "判断链表是否为回文结构。",
  25: "判断链表中是否存在环。",
  26: "返回链表环的入口节点。",
  27: "合并两个升序链表。",
  28: "两个逆序存储的非负整数链表相加。",
  29: "删除链表倒数第 n 个节点。",
  30: "两两交换链表中的相邻节点。",
  31: "每 k 个节点为一组翻转链表。",
  32: "深拷贝带随机指针的链表。",
  33: "对链表进行升序排序。",
  34: "合并 k 个升序链表。",
  35: "实现支持最近最少使用淘汰策略的缓存。",
  36: "返回二叉树的中序遍历结果。",
  37: "求二叉树最大深度。",
  38: "翻转二叉树左右子树。",
  39: "判断一棵树是否左右对称。",
  40: "求二叉树任意两节点最长路径长度。",
  41: "按层序返回二叉树节点值。",
  42: "把有序数组转成高度平衡二叉搜索树。",
  43: "判断一棵树是否是合法二叉搜索树。",
  44: "找出二叉搜索树中第 k 小的元素。",
  45: "从右侧观察二叉树能看到的节点。",
  46: "将二叉树原地展开成先序链表。",
  47: "根据前序和中序遍历重建二叉树。",
  48: "统计二叉树中和为目标值的路径数量。",
  49: "求二叉树中两个节点的最近公共祖先。",
  50: "求二叉树任意路径的最大路径和。",
  51: "统计网格中岛屿的数量。",
  52: "计算所有新鲜橘子腐烂所需最少分钟数。",
  53: "判断课程依赖图中是否能完成所有课程。",
  54: "实现前缀树，支持插入、完整匹配和前缀匹配。",
  55: "返回数组的所有全排列。",
  56: "返回数组的所有子集。",
  57: "把数字字符串映射成所有可能字母组合。",
  58: "找出所有和为目标值的可重复选取组合。",
  59: "生成所有合法括号组合。",
  60: "判断单词是否能在网格中按相邻路径拼出。",
  61: "把字符串切分成所有回文子串方案。",
  62: "返回 n 皇后的所有合法摆放方案。",
  63: "在旋转有序数组中查找目标值。",
  64: "找出目标值在有序数组中的首尾位置。",
  65: "在整体有序的二维矩阵中查找目标值。",
  66: "找出旋转有序数组中的最小元素。",
  67: "求两个有序数组合并后的中位数。",
  68: "判断括号字符串是否合法匹配。",
  69: "实现支持常数时间取最小值的栈。",
  70: "将带重复次数的编码字符串解码。",
  71: "对每天温度，求还需等几天才会更高。",
  72: "求柱状图中最大矩形面积。",
  73: "找出数组中第 k 个最大的元素。",
  74: "返回数组中出现频率最高的前 k 个元素。",
  75: "在数据流中动态维护中位数。",
  76: "一次买卖股票可获得的最大利润。",
  77: "判断是否能跳到数组最后一个位置。",
  78: "求到达数组末尾的最少跳跃次数。",
  79: "把字符串划分成尽量多且字符不重复跨段的区间。",
  80: "每次爬 1 或 2 阶，求到顶方案数。",
  81: "生成杨辉三角前 numRows 行。",
  82: "房屋相邻不可同时偷，求最大金额。",
  83: "求和为 n 的最少完全平方数个数。",
  84: "用最少硬币凑出指定金额。",
  85: "判断字符串能否被字典单词完全拆分。",
  86: "求数组最长严格递增子序列长度。",
  87: "求连续子数组乘积最大值。",
  88: "判断数组能否分成两个和相等的子集。",
  89: "求最长合法括号子串长度。",
  90: "机器人只能向右或向下，求不同路径数。",
  91: "从左上到右下，求路径数字和最小值。",
  92: "找出字符串中最长回文子串。",
  93: "求两个字符串的最长公共子序列长度。",
  94: "把一个字符串变成另一个的最少编辑操作数。",
  95: "找出数组中出现次数超过一半的元素。",
  96: "原地排序只含 0、1、2 的数组。",
  97: "把数组调整成字典序下一个更大的排列。",
  98: "在 1 到 n 的数组中找出唯一重复数字。",
  99: "含冷冻期约束时的股票最大利润。",
  100: "求只包含 1 的最大正方形面积。",
};

const state = {
  groups: [],
  problems: [],
  expanded: true,
  activeId: null,
  langFilter: "both",
};

const nav = document.getElementById("nav");
const content = document.getElementById("content");
const searchInput = document.getElementById("searchInput");
const countText = document.getElementById("countText");
const heroText = document.getElementById("heroText");
const toggleAllBtn = document.getElementById("toggleAllBtn");

init().catch((error) => {
  content.innerHTML = `<div class="loading">加载失败：${escapeHtml(String(error))}<br>请用本地 HTTP 服务打开此页面，例如 <code>python3 -m http.server</code>。</div>`;
});

async function init() {
  const texts = await Promise.all(
    files.map(async (file) => ({
      ...file,
      text: await fetch(file.path).then((res) => {
        if (!res.ok) throw new Error(`无法读取 ${file.path}`);
        return res.text();
      }),
    }))
  );

  state.groups = texts.map(parseGroup);
  state.problems = state.groups.flatMap((group) => group.items);
  state.activeId = state.problems[0]?.id ?? null;

  const hash = decodeURIComponent(location.hash.slice(1));
  if (hash && state.problems.some((item) => item.id === hash)) state.activeId = hash;

  heroText.textContent = `共 ${state.problems.length} 题，新增简要题面摘要，并优化了代码卡片、语言标签和复制操作。`;
  bindEvents();
  render();

  if (state.activeId) {
    const node = document.getElementById(state.activeId);
    if (node) node.scrollIntoView({ block: "start" });
  }
}

function bindEvents() {
  searchInput.addEventListener("input", render);
  toggleAllBtn.addEventListener("click", () => {
    state.expanded = !state.expanded;
    renderNav();
  });
  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (state.problems.some((item) => item.id === id)) {
      state.activeId = id;
      setActiveLink();
    }
  });
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".copy-btn");
    if (button) {
      try {
        const code = button.closest(".code-card")?.querySelector("code")?.innerText || "";
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        setTimeout(() => {
          button.textContent = "复制代码";
        }, 1200);
      } catch {
        button.textContent = "复制失败";
        setTimeout(() => {
          button.textContent = "复制代码";
        }, 1200);
      }
      return;
    }

    const filter = event.target.closest(".lang-filter-btn");
    if (filter) {
      state.langFilter = filter.dataset.filter;
      renderContent();
      return;
    }

    const tab = event.target.closest(".code-tab");
    if (tab) {
      const wrap = tab.closest(".code-switcher");
      wrap?.querySelectorAll(".code-tab").forEach((node) => {
        node.classList.toggle("active", node === tab);
      });
      wrap?.querySelectorAll(".code-panel").forEach((node) => {
        node.hidden = node.dataset.lang !== tab.dataset.lang;
      });
    }
  });
}

function parseGroup(file) {
  const lines = file.text.split(/\r?\n/);
  const title = lines[0].replace(/^#\s*/, "").trim();
  const chunks = file.text.split(/^##\s+/m).slice(1);
  const items = chunks.map((chunk) => {
    const full = `## ${chunk}`.trim();
    const [headline, ...rest] = full.split(/\r?\n/);
    const match = headline.match(/^##\s+(\d+)\.\s+(.+)$/);
    const number = Number(match[1]);
    const name = match[2].trim();
    const parsed = parseProblemBody(rest.join("\n").trim());
    return {
      id: `${number}-${name}`.replace(/\s+/g, "-"),
      number,
      name,
      group: title,
      brief: briefMap[number] || `浏览 ${name} 的简要题意与极简题解。`,
      ...parsed,
    };
  });
  return { title, file: file.name, items };
}

function parseProblemBody(markdown) {
  const lines = markdown.split(/\r?\n/);
  const intro = [];
  const codeBlocks = [];
  let inCode = false;
  let lang = "";
  let buffer = [];

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        lang = line.slice(3).trim();
        buffer = [];
      } else {
        codeBlocks.push({ lang, code: buffer.join("\n").trimEnd() });
        inCode = false;
        lang = "";
        buffer = [];
      }
      continue;
    }
    if (inCode) {
      buffer.push(line);
    } else {
      intro.push(line);
    }
  }

  let idea = "";
  const extra = [];
  for (const raw of intro) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("思路：")) idea = line.slice(3).trim();
    else extra.push(line);
  }

  return {
    idea,
    extraHtml: renderMarkdown(extra.join("\n")),
    codeBlocks,
  };
}

function render() {
  renderNav();
  renderContent();
}

function renderNav() {
  const keyword = searchInput.value.trim().toLowerCase();
  const groups = state.groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.number} ${item.name} ${item.group} ${item.brief} ${item.idea}`.toLowerCase().includes(keyword)
      ),
    }))
    .filter((group) => group.items.length);

  countText.textContent = keyword
    ? `匹配 ${groups.reduce((sum, group) => sum + group.items.length, 0)} 题`
    : `共 ${state.problems.length} 题`;
  toggleAllBtn.textContent = state.expanded ? "折叠全部分组" : "展开全部分组";

  nav.innerHTML = groups
    .map(
      (group) => `
        <section class="group" data-collapsed="${state.expanded ? "false" : "true"}">
          <button class="group-header" type="button">
            <div class="group-label">
              <strong>${escapeHtml(group.title)}</strong>
              <span>${group.items[0].number} - ${group.items[group.items.length - 1].number}</span>
            </div>
            <span>${group.items.length}</span>
          </button>
          <div class="group-items">
            ${group.items
              .map(
                (item) => `
                  <a class="problem-link ${item.id === state.activeId ? "active" : ""}" href="#${encodeURIComponent(item.id)}" data-id="${item.id}">
                    ${item.number}. ${escapeHtml(item.name)}
                    <small>${escapeHtml(item.brief)}</small>
                  </a>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");

  nav.querySelectorAll(".group-header").forEach((button) => {
    button.addEventListener("click", (event) => {
      const section = event.currentTarget.closest(".group");
      const collapsed = section.dataset.collapsed === "true";
      section.dataset.collapsed = collapsed ? "false" : "true";
    });
  });

  nav.querySelectorAll(".problem-link").forEach((link) => {
    link.addEventListener("click", () => {
      state.activeId = link.dataset.id;
      setActiveLink();
    });
  });
}

function renderContent() {
  const toolbar = `
    <section class="toolbar-card">
      <div>
        <p class="eyebrow">Code View</p>
        <h3 class="toolbar-title">代码显示</h3>
      </div>
      <div class="lang-filter">
        ${renderLangFilterButton("both", "全部")}
        ${renderLangFilterButton("python", "只看 Python")}
        ${renderLangFilterButton("cpp", "只看 C++")}
      </div>
    </section>
  `;

  content.innerHTML = toolbar + state.problems
    .map(
      (item) => `
        <article class="section-card" id="${escapeHtml(item.id)}">
          <div class="problem-head">
            <div>
              <p class="eyebrow">${escapeHtml(item.group)}</p>
              <h3>${item.number}. ${escapeHtml(item.name)}</h3>
            </div>
            <a class="anchor-link" href="#${encodeURIComponent(item.id)}">#${item.number}</a>
          </div>

          <div class="summary-grid">
            <section class="info-box brief-box">
              <p class="box-title">简要题面</p>
              <p>${escapeHtml(item.brief)}</p>
            </section>
            <section class="info-box idea-box">
              <p class="box-title">核心思路</p>
              <p>${escapeHtml(item.idea || "见下方代码。")}</p>
            </section>
          </div>

          ${item.extraHtml ? `<div class="problem-extra">${item.extraHtml}</div>` : ""}

          ${renderCodeSection(item.codeBlocks)}
        </article>
      `
    )
    .join("");
}

function renderLangFilterButton(value, label) {
  return `<button class="lang-filter-btn ${state.langFilter === value ? "active" : ""}" type="button" data-filter="${value}">${label}</button>`;
}

function renderCodeSection(blocks) {
  const visible = state.langFilter === "both"
    ? blocks
    : blocks.filter((block) => normalizeLangKey(block.lang) === state.langFilter);

  if (!visible.length) {
    return `<div class="code-empty">当前过滤条件下没有代码块。</div>`;
  }

  if (visible.length === 1) {
    return `<div class="code-grid single">${visible.map(renderCodeBlock).join("")}</div>`;
  }

  const first = normalizeLangKey(visible[0].lang);
  return `
    <section class="code-switcher">
      <div class="code-tabs">
        ${visible.map((block, index) => {
          const key = normalizeLangKey(block.lang);
          return `<button class="code-tab ${index === 0 ? "active" : ""}" type="button" data-lang="${key}">${escapeHtml(normalizeLang(block.lang))}</button>`;
        }).join("")}
      </div>
      ${visible.map((block, index) => {
        const key = normalizeLangKey(block.lang);
        return `<div class="code-panel" data-lang="${key}" ${index === 0 ? "" : "hidden"}>${renderCodeBlock(block)}</div>`;
      }).join("")}
    </section>
  `;
}

function renderCodeBlock(block) {
  const label = normalizeLang(block.lang);
  const codeHtml = renderCodeWithLines(block.code, block.lang);
  return `
    <section class="code-card">
      <header class="code-head">
        <span class="code-lang">${escapeHtml(label)}</span>
        <button class="copy-btn" type="button">复制代码</button>
      </header>
      <pre class="code-pre"><code class="language-${escapeHtml(block.lang || "text")}">${codeHtml}</code></pre>
    </section>
  `;
}

function setActiveLink() {
  document.querySelectorAll(".problem-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.id === state.activeId);
  });
}

function renderMarkdown(markdown) {
  if (!markdown.trim()) return "";
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html += `<p>${inlineMarkdown(paragraph.join(" "))}</p>`;
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html += "</ul>";
    inList = false;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      closeList();
      html += `<h4>${inlineMarkdown(line.slice(4))}</h4>`;
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMarkdown(line.slice(2))}</li>`;
      continue;
    }
    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return html;
}

function inlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
}

function normalizeLang(lang) {
  if (!lang) return "Code";
  const key = lang.toLowerCase();
  if (key === "py" || key === "python") return "Python";
  if (key === "cpp" || key === "c++" || key === "cc") return "C++";
  return lang;
}

function normalizeLangKey(lang) {
  const key = (lang || "").toLowerCase();
  if (key === "py" || key === "python") return "python";
  if (key === "cpp" || key === "c++" || key === "cc") return "cpp";
  return key || "text";
}

function renderCodeWithLines(code, lang) {
  return highlightCode(code, lang)
    .split("\n")
    .map((line, index) => `<span class="code-line"><span class="code-line-no">${index + 1}</span><span class="code-line-text">${line || " "}</span></span>`)
    .join("");
}

function highlightCode(code, lang) {
  const key = (lang || "").toLowerCase();
  if (key.startsWith("py")) return highlightPython(code);
  if (key.includes("cpp") || key.includes("c++") || key === "cc") return highlightCpp(code);
  return escapeHtml(code);
}

function highlightPython(code) {
  return highlightWithRules(code, {
    strings: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
    comments: /(#.*)$/gm,
    keywords: /\b(class|def|return|for|while|if|elif|else|in|not|and|or|from|import|with|as|try|except|finally|lambda|None|True|False|nonlocal|pass|break|continue|raise|yield|global|is|del)\b/g,
    extras: [
      { regex: /\b(self|cls)\b/g, cls: "tok-var" },
      { regex: /@[A-Za-z_][A-Za-z0-9_]*/g, cls: "tok-meta" },
      { regex: /\b(print|len|range|enumerate|map|filter|zip|max|min|sum|sorted|list|set|dict|tuple|int|str|float|bool)\b/g, cls: "tok-builtin" },
      { regex: /\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, cls: "tok-fn" },
      { regex: /\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=:)/g, cls: "tok-var" },
    ],
    numbers: /\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g,
  });
}

function highlightCpp(code) {
  return highlightWithRules(code, {
    strings: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
    comments: /(?:\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    keywords: /\b(class|struct|public|private|protected|return|for|while|if|else|auto|int|bool|void|nullptr|true|false|const|constexpr|using|namespace|template|typename|vector|string|unordered_map|unordered_set|stack|queue|deque|priority_queue|long|short|double|float|char|switch|case|break|continue|new|delete|this|virtual|override|static|pair)\b/g,
    extras: [
      { regex: /#[A-Za-z_]+/g, cls: "tok-meta" },
      { regex: /\b(std|cout|cin|endl|max|min|sort|swap|reverse|push_back|emplace_back|begin|end)\b/g, cls: "tok-builtin" },
      { regex: /\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, cls: "tok-fn" },
      { regex: /\b([A-Z][A-Za-z0-9_]*)\b/g, cls: "tok-type" },
    ],
    numbers: /\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g,
  });
}

function highlightWithRules(code, rules) {
  const marks = [];

  const pushMatches = (regex, cls) => {
    if (!regex) return;
    for (const match of code.matchAll(regex)) {
      if (match.index == null) continue;
      marks.push({ start: match.index, end: match.index + match[0].length, cls });
    }
  };

  pushMatches(rules.strings, "tok-str");
  pushMatches(rules.comments, "tok-comment");

  const protectedRanges = marks.slice();
  const isProtected = (start, end) =>
    protectedRanges.some((item) => Math.max(item.start, start) < Math.min(item.end, end));

  const pushSafeMatches = (regex, cls) => {
    if (!regex) return;
    for (const match of code.matchAll(regex)) {
      if (match.index == null) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (!isProtected(start, end)) marks.push({ start, end, cls });
    }
  };

  pushSafeMatches(rules.keywords, "tok-key");
  pushSafeMatches(rules.numbers, "tok-num");
  for (const item of rules.extras || []) pushSafeMatches(item.regex, item.cls);

  marks.sort((a, b) => a.start - b.start || b.end - a.end);
  const filtered = [];
  let lastEnd = -1;
  for (const mark of marks) {
    if (mark.start < lastEnd) continue;
    filtered.push(mark);
    lastEnd = mark.end;
  }

  let html = "";
  let pos = 0;
  for (const mark of filtered) {
    html += escapeHtml(code.slice(pos, mark.start));
    html += `<span class="${mark.cls}">${escapeHtml(code.slice(mark.start, mark.end))}</span>`;
    pos = mark.end;
  }
  html += escapeHtml(code.slice(pos));
  return html;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

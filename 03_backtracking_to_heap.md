# 03 Backtracking To Heap

## 55. 全排列
思路：回溯时把还没用过的数字依次放进路径。

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        ans, path, used = [], [], [False] * len(nums)
        def dfs():
            if len(path) == len(nums):
                ans.append(path[:]); return
            for i, x in enumerate(nums):
                if used[i]: continue
                used[i] = True; path.append(x)
                dfs()
                path.pop(); used[i] = False
        dfs()
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    vector<bool> used;
    void dfs(vector<int>& nums) {
        if (path.size() == nums.size()) return ans.push_back(path);
        for (int i = 0; i < nums.size(); ++i) if (!used[i]) {
            used[i] = true; path.push_back(nums[i]);
            dfs(nums);
            path.pop_back(); used[i] = false;
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        used.assign(nums.size(), false);
        dfs(nums);
        return ans;
    }
};
```

## 56. 子集
思路：每个数只有选或不选两种状态，直接回溯。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        ans, path = [], []
        def dfs(i):
            if i == len(nums):
                ans.append(path[:]); return
            dfs(i + 1)
            path.append(nums[i]); dfs(i + 1); path.pop()
        dfs(0)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    void dfs(vector<int>& nums, int i) {
        if (i == nums.size()) return ans.push_back(path);
        dfs(nums, i + 1);
        path.push_back(nums[i]);
        dfs(nums, i + 1);
        path.pop_back();
    }
    vector<vector<int>> subsets(vector<int>& nums) { dfs(nums, 0); return ans; }
};
```

## 57. 电话号码的字母组合
思路：按数字顺序逐位扩展答案。

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        mp = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
        ans, path = [], []
        def dfs(i):
            if i == len(digits):
                ans.append(''.join(path)); return
            for c in mp[ord(digits[i]) - 48]:
                path.append(c); dfs(i + 1); path.pop()
        dfs(0)
        return ans
```

```cpp
class Solution {
public:
    vector<string> mp{"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"}, ans;
    string path;
    void dfs(string& digits, int i) {
        if (i == digits.size()) return ans.push_back(path);
        for (char c : mp[digits[i] - '0']) {
            path.push_back(c);
            dfs(digits, i + 1);
            path.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        dfs(digits, 0);
        return ans;
    }
};
```

## 58. 组合总和
思路：每次可以重复选当前数，所以递归时下标不后移。

```python
class Solution:
    def combinationSum(self, a: List[int], target: int) -> List[List[int]]:
        ans, path = [], []
        def dfs(i, s):
            if s == 0: ans.append(path[:]); return
            if i == len(a) or s < 0: return
            dfs(i + 1, s)
            path.append(a[i]); dfs(i, s - a[i]); path.pop()
        dfs(0, target)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    void dfs(vector<int>& a, int i, int s) {
        if (!s) return ans.push_back(path);
        if (i == a.size() || s < 0) return;
        dfs(a, i + 1, s);
        path.push_back(a[i]);
        dfs(a, i, s - a[i]);
        path.pop_back();
    }
    vector<vector<int>> combinationSum(vector<int>& a, int target) {
        dfs(a, 0, target);
        return ans;
    }
};
```

## 59. 括号生成
思路：左括号数量没满就能放左括号，右括号少于左括号才能放右括号。

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans, path = [], []
        def dfs(l, r):
            if l == r == n: ans.append(''.join(path)); return
            if l < n: path.append('('); dfs(l + 1, r); path.pop()
            if r < l: path.append(')'); dfs(l, r + 1); path.pop()
        dfs(0, 0)
        return ans
```

```cpp
class Solution {
public:
    vector<string> ans;
    string path;
    void dfs(int n, int l, int r) {
        if (l == n && r == n) return ans.push_back(path);
        if (l < n) path.push_back('('), dfs(n, l + 1, r), path.pop_back();
        if (r < l) path.push_back(')'), dfs(n, l, r + 1), path.pop_back();
    }
    vector<string> generateParenthesis(int n) { dfs(n, 0, 0); return ans; }
};
```

## 60. 单词搜索
思路：从每个起点 DFS，走过的位置临时标记避免重复使用。

```python
class Solution:
    def exist(self, b: List[List[str]], w: str) -> bool:
        m, n = len(b), len(b[0])
        def dfs(i, j, k):
            if k == len(w): return True
            if i < 0 or i == m or j < 0 or j == n or b[i][j] != w[k]: return False
            c, b[i][j] = b[i][j], ''
            ok = (
                dfs(i + 1, j, k + 1)
                or dfs(i - 1, j, k + 1)
                or dfs(i, j + 1, k + 1)
                or dfs(i, j - 1, k + 1)
            )
            b[i][j] = c
            return ok
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))
```

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& b, string w) {
        int m = b.size(), n = b[0].size();
        function<bool(int,int,int)> dfs = [&](int i, int j, int k) {
            if (k == w.size()) return true;
            if (i < 0 || i >= m || j < 0 || j >= n || b[i][j] != w[k]) return false;
            char c = b[i][j]; b[i][j] = 0;
            bool ok =
                dfs(i + 1, j, k + 1) ||
                dfs(i - 1, j, k + 1) ||
                dfs(i, j + 1, k + 1) ||
                dfs(i, j - 1, k + 1);
            b[i][j] = c;
            return ok;
        };
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                if (dfs(i, j, 0)) return true;
        return false;
    }
};
```

## 61. 分割回文串
思路：枚举切割点，只把回文段加入路径。

```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        ans, path = [], []
        def dfs(i):
            if i == len(s):
                ans.append(path[:]); return
            for j in range(i, len(s)):
                t = s[i:j + 1]
                if t == t[::-1]:
                    path.append(t); dfs(j + 1); path.pop()
        dfs(0)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<string>> ans;
    vector<string> path;
    void dfs(string& s, int i) {
        if (i == s.size()) return ans.push_back(path);
        for (int j = i; j < s.size(); ++j) {
            string t = s.substr(i, j - i + 1), r = t;
            reverse(r.begin(), r.end());
            if (t == r) {
                path.push_back(t);
                dfs(s, j + 1);
                path.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) { dfs(s, 0); return ans; }
};
```

## 62. N 皇后
思路：列、主对角线、副对角线都不能冲突。

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        ans, path, c, d1, d2 = [], [], set(), set(), set()
        def dfs(i):
            if i == n: ans.append(path[:]); return
            for j in range(n):
                if j in c or i - j in d1 or i + j in d2: continue
                row = '.' * j + 'Q' + '.' * (n - j - 1)
                path.append(row); c.add(j); d1.add(i - j); d2.add(i + j)
                dfs(i + 1)
                path.pop(); c.remove(j); d1.remove(i - j); d2.remove(i + j)
        dfs(0)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<string>> ans;
    vector<string> path;
    vector<int> c, d1, d2;
    void dfs(int n, int i) {
        if (i == n) return ans.push_back(path);
        for (int j = 0; j < n; ++j) if (!c[j] && !d1[i - j + n] && !d2[i + j]) {
            string row(n, '.'); row[j] = 'Q';
            path.push_back(row); c[j] = d1[i - j + n] = d2[i + j] = 1;
            dfs(n, i + 1);
            path.pop_back(); c[j] = d1[i - j + n] = d2[i + j] = 0;
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        c.assign(n, 0); d1.assign(2 * n, 0); d2.assign(2 * n, 0);
        dfs(n, 0);
        return ans;
    }
};
```

## 63. 搜索旋转排序数组
思路：二分时先判断哪一半有序，再决定往哪走。

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            m = (l + r) // 2
            if nums[m] == target: return m
            if nums[l] <= nums[m]:
                if nums[l] <= target < nums[m]: r = m - 1
                else: l = m + 1
            else:
                if nums[m] < target <= nums[r]: l = m + 1
                else: r = m - 1
        return -1
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int m = (l + r) >> 1;
            if (nums[m] == target) return m;
            if (nums[l] <= nums[m]) {
                if (nums[l] <= target && target < nums[m]) r = m - 1;
                else l = m + 1;
            } else {
                if (nums[m] < target && target <= nums[r]) l = m + 1;
                else r = m - 1;
            }
        }
        return -1;
    }
};
```

## 64. 在排序数组中查找元素的第一个和最后一个位置
思路：分别二分左边界和右边界。

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        l = bisect_left(nums, target)
        r = bisect_right(nums, target) - 1
        return [l, r] if l <= r else [-1, -1]
```

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        auto l = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
        auto r = upper_bound(nums.begin(), nums.end(), target) - nums.begin() - 1;
        return l <= r ? vector<int>{(int)l, (int)r} : vector<int>{-1, -1};
    }
};
```

## 65. 搜索二维矩阵
思路：把矩阵看成一维有序数组后二分。

```python
class Solution:
    def searchMatrix(self, a: List[List[int]], target: int) -> bool:
        m, n = len(a), len(a[0])
        l, r = 0, m * n - 1
        while l <= r:
            mid = (l + r) // 2
            x = a[mid // n][mid % n]
            if x == target: return True
            if x < target: l = mid + 1
            else: r = mid - 1
        return False
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& a, int target) {
        int m = a.size(), n = a[0].size(), l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = (l + r) >> 1, x = a[mid / n][mid % n];
            if (x == target) return true;
            if (x < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
};
```

## 66. 寻找旋转排序数组中的最小值
思路：最小值一定落在无序那一半。

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]: l = m + 1
            else: r = m
        return nums[l]
```

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] > nums[r]) l = m + 1;
            else r = m;
        }
        return nums[l];
    }
};
```

## 67. 寻找两个正序数组的中位数
思路：用二分切分两个数组，让左半最大值不大于右半最小值。

```python
class Solution:
    def findMedianSortedArrays(self, a: List[int], b: List[int]) -> float:
        if len(a) > len(b): a, b = b, a
        m, n = len(a), len(b)
        l, r = 0, m
        while l <= r:
            i = (l + r) // 2
            j = (m + n + 1) // 2 - i
            al = -inf if i == 0 else a[i - 1]
            ar = inf if i == m else a[i]
            bl = -inf if j == 0 else b[j - 1]
            br = inf if j == n else b[j]
            if al <= br and bl <= ar:
                if (m + n) & 1: return max(al, bl)
                return (max(al, bl) + min(ar, br)) / 2
            if al > br: r = i - 1
            else: l = i + 1
```

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& a, vector<int>& b) {
        if (a.size() > b.size()) return findMedianSortedArrays(b, a);
        int m = a.size(), n = b.size(), l = 0, r = m;
        while (l <= r) {
            int i = (l + r) >> 1, j = (m + n + 1) / 2 - i;
            int al = i ? a[i - 1] : INT_MIN, ar = i < m ? a[i] : INT_MAX;
            int bl = j ? b[j - 1] : INT_MIN, br = j < n ? b[j] : INT_MAX;
            if (al <= br && bl <= ar)
                return (m + n) & 1 ? max(al, bl) : (max(al, bl) + min(ar, br)) / 2.0;
            if (al > br) r = i - 1;
            else l = i + 1;
        }
        return 0;
    }
};
```

## 68. 有效括号
思路：栈顶匹配当前右括号时弹出，否则非法。

```python
class Solution:
    def isValid(self, s: str) -> bool:
        st, mp = [], {')': '(', ']': '[', '}': '{'}
        for c in s:
            if c in '([{': st.append(c)
            elif not st or st.pop() != mp[c]: return False
        return not st
```

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char,char> mp{{')','('},{']','['},{'}','{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else if (st.empty() || st.top() != mp[c]) return false;
            else st.pop();
        }
        return st.empty();
    }
};
```

## 69. 最小栈
思路：辅助栈同步维护当前最小值。

```python
class MinStack:
    def __init__(self):
        self.a = []
        self.b = []
    def push(self, val: int) -> None:
        self.a.append(val)
        self.b.append(val if not self.b else min(val, self.b[-1]))
    def pop(self) -> None:
        self.a.pop(); self.b.pop()
    def top(self) -> int:
        return self.a[-1]
    def getMin(self) -> int:
        return self.b[-1]
```

```cpp
class MinStack {
    stack<int> a, b;
public:
    void push(int val) {
        a.push(val);
        b.push(b.empty() ? val : min(val, b.top()));
    }
    void pop() { a.pop(); b.pop(); }
    int top() { return a.top(); }
    int getMin() { return b.top(); }
};
```

## 70. 字符串解码
思路：遇到 `[` 就入栈保存当前倍数和已有字符串，遇到 `]` 再展开。

```python
class Solution:
    def decodeString(self, s: str) -> str:
        st, num, cur = [], 0, ''
        for c in s:
            if c.isdigit(): num = num * 10 + int(c)
            elif c == '[': st.append((cur, num)); cur = ''; num = 0
            elif c == ']':
                pre, k = st.pop()
                cur = pre + cur * k
            else: cur += c
        return cur
```

```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<pair<string,int>> st;
        string cur;
        int num = 0;
        for (char c : s) {
            if (isdigit(c)) num = num * 10 + c - '0';
            else if (c == '[') st.push({cur, num}), cur = "", num = 0;
            else if (c == ']') {
                auto [pre, k] = st.top(); st.pop();
                string t;
                while (k--) t += cur;
                cur = pre + t;
            } else cur += c;
        }
        return cur;
    }
};
```

## 71. 每日温度
思路：单调栈存还没找到更高温度的下标。

```python
class Solution:
    def dailyTemperatures(self, t: List[int]) -> List[int]:
        st, ans = [], [0] * len(t)
        for i, x in enumerate(t):
            while st and t[st[-1]] < x:
                j = st.pop()
                ans[j] = i - j
            st.append(i)
        return ans
```

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& t) {
        stack<int> st;
        vector<int> ans(t.size());
        for (int i = 0; i < t.size(); ++i) {
            while (!st.empty() && t[st.top()] < t[i]) {
                ans[st.top()] = i - st.top();
                st.pop();
            }
            st.push(i);
        }
        return ans;
    }
};
```

## 72. 柱状图中最大的矩形
思路：单调栈找到每根柱子左右第一个更小的位置。

```python
class Solution:
    def largestRectangleArea(self, h: List[int]) -> int:
        st, ans = [], 0
        for i, x in enumerate(h + [0]):
            while st and h[st[-1]] > x:
                cur = h[st.pop()]
                l = st[-1] if st else -1
                ans = max(ans, cur * (i - l - 1))
            st.append(i)
        return ans
```

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& h) {
        stack<int> st;
        int ans = 0;
        h.push_back(0);
        for (int i = 0; i < h.size(); ++i) {
            while (!st.empty() && h[st.top()] > h[i]) {
                int cur = h[st.top()]; st.pop();
                int l = st.empty() ? -1 : st.top();
                ans = max(ans, cur * (i - l - 1));
            }
            st.push(i);
        }
        return ans;
    }
};
```

## 73. 数组中的第 K 个最大元素
思路：维护大小为 `k` 的小根堆。

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        h = nums[:k]
        heapify(h)
        for x in nums[k:]:
            if x > h[0]: heapreplace(h, x)
        return h[0]
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int x : nums) {
            pq.push(x);
            if (pq.size() > k) pq.pop();
        }
        return pq.top();
    }
};
```

## 74. 前 K 个高频元素
思路：先计数，再按频次取前 `k` 个。

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        return [x for x, _ in Counter(nums).most_common(k)]
```

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> mp;
        for (int x : nums) ++mp[x];
        vector<pair<int,int>> a(mp.begin(), mp.end());
        nth_element(
            a.begin(),
            a.begin() + k,
            a.end(),
            [](auto& x, auto& y) { return x.second > y.second; }
        );
        vector<int> ans;
        for (int i = 0; i < k; ++i) ans.push_back(a[i].first);
        return ans;
    }
};
```

## 75. 数据流的中位数
思路：一个大根堆存左半边，一个小根堆存右半边。

```python
class MedianFinder:
    def __init__(self):
        self.l = []
        self.r = []
    def addNum(self, num: int) -> None:
        heappush(self.l, -num)
        heappush(self.r, -heappop(self.l))
        if len(self.r) > len(self.l): heappush(self.l, -heappop(self.r))
    def findMedian(self) -> float:
        return -self.l[0] if len(self.l) > len(self.r) else (-self.l[0] + self.r[0]) / 2
```

```cpp
class MedianFinder {
    priority_queue<int> l;
    priority_queue<int, vector<int>, greater<int>> r;
public:
    void addNum(int num) {
        l.push(num);
        r.push(l.top()); l.pop();
        if (r.size() > l.size()) l.push(r.top()), r.pop();
    }
    double findMedian() {
        return l.size() > r.size() ? l.top() : (l.top() + r.top()) / 2.0;
    }
};
```

## 76. 买卖股票的最佳时机
思路：维护到当前位置为止的最低买入价。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        mn = inf; ans = 0
        for x in prices:
            mn = min(mn, x)
            ans = max(ans, x - mn)
        return ans
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int mn = INT_MAX, ans = 0;
        for (int x : prices) mn = min(mn, x), ans = max(ans, x - mn);
        return ans;
    }
};
```

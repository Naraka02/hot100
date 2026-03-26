# 01 Hash To Matrix

## 1. 两数之和
思路：哈希表记录数字到下标，扫描时直接查补数。

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d = {}
        for i, x in enumerate(nums):
            if target - x in d: return [d[target - x], i]
            d[x] = i
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> mp;
        for (int i = 0; i < nums.size(); ++i) {
            if (mp.count(target - nums[i])) return {mp[target - nums[i]], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

## 2. 字母异位词分组
思路：排序后的字符串就是分组键。

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        d = defaultdict(list)
        for s in strs:
            d[''.join(sorted(s))].append(s)
        return list(d.values())
```

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (auto s : strs) {
            string t = s;
            sort(t.begin(), t.end());
            mp[t].push_back(s);
        }
        vector<vector<string>> ans;
        for (auto& [_, v] : mp) ans.push_back(v);
        return ans;
    }
};
```

## 3. 最长连续序列
思路：只从连续段起点开始往后扩展，避免重复枚举。

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        s, ans = set(nums), 0
        for x in s:
            if x - 1 not in s:
                y = x
                while y in s: y += 1
                ans = max(ans, y - x)
        return ans
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int ans = 0;
        for (int x : st) if (!st.count(x - 1)) {
            int y = x;
            while (st.count(y)) ++y;
            ans = max(ans, y - x);
        }
        return ans;
    }
};
```

## 4. 移动零
思路：双指针把非零元素稳定搬到前面。

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        j = 0
        for x in nums:
            if x:
                nums[j] = x
                j += 1
        nums[j:] = [0] * (len(nums) - j)
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int j = 0;
        for (int x : nums) if (x) nums[j++] = x;
        while (j < nums.size()) nums[j++] = 0;
    }
};
```

## 5. 盛最多水的容器
思路：短板决定面积，所以移动短板才可能变大。

```python
class Solution:
    def maxArea(self, h: List[int]) -> int:
        i, j, ans = 0, len(h) - 1, 0
        while i < j:
            ans = max(ans, (j - i) * min(h[i], h[j]))
            if h[i] < h[j]: i += 1
            else: j -= 1
        return ans
```

```cpp
class Solution {
public:
    int maxArea(vector<int>& h) {
        int i = 0, j = h.size() - 1, ans = 0;
        while (i < j) {
            ans = max(ans, (j - i) * min(h[i], h[j]));
            if (h[i] < h[j]) ++i;
            else --j;
        }
        return ans;
    }
};
```

## 6. 三数之和
思路：排序后固定一个数，再双指针找另外两个数。

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        ans = []
        for i, x in enumerate(nums):
            if i and x == nums[i - 1]: continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = x + nums[l] + nums[r]
                if s < 0: l += 1
                elif s > 0: r -= 1
                else:
                    ans.append([x, nums[l], nums[r]])
                    l += 1; r -= 1
                    while l < r and nums[l] == nums[l - 1]: l += 1
                    while l < r and nums[r] == nums[r + 1]: r -= 1
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        for (int i = 0; i < nums.size(); ++i) {
            if (i && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s < 0) ++l;
                else if (s > 0) --r;
                else {
                    ans.push_back({nums[i], nums[l], nums[r]});
                    ++l; --r;
                    while (l < r && nums[l] == nums[l - 1]) ++l;
                    while (l < r && nums[r] == nums[r + 1]) --r;
                }
            }
        }
        return ans;
    }
};
```

## 7. 接雨水
思路：左右最大值中较小的一边决定当前位置能接多少水。

```python
class Solution:
    def trap(self, h: List[int]) -> int:
        l, r = 0, len(h) - 1
        lm = rm = ans = 0
        while l < r:
            lm = max(lm, h[l]); rm = max(rm, h[r])
            if lm < rm:
                ans += lm - h[l]; l += 1
            else:
                ans += rm - h[r]; r -= 1
        return ans
```

```cpp
class Solution {
public:
    int trap(vector<int>& h) {
        int l = 0, r = h.size() - 1, lm = 0, rm = 0, ans = 0;
        while (l < r) {
            lm = max(lm, h[l]);
            rm = max(rm, h[r]);
            if (lm < rm) ans += lm - h[l++];
            else ans += rm - h[r--];
        }
        return ans;
    }
};
```

## 8. 无重复字符的最长子串
思路：滑动窗口维护无重复区间，左端按上次出现位置跳。

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        d = {}
        l = ans = 0
        for r, c in enumerate(s):
            if c in d: l = max(l, d[c] + 1)
            d[c] = r
            ans = max(ans, r - l + 1)
        return ans
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char,int> mp;
        int l = 0, ans = 0;
        for (int r = 0; r < s.size(); ++r) {
            if (mp.count(s[r])) l = max(l, mp[s[r]] + 1);
            mp[s[r]] = r;
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```

## 9. 找到字符串中所有字母异位词
思路：定长滑窗比较 26 个字母计数。

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(s) < len(p): return []
        a = [0] * 26
        b = [0] * 26
        for c in p: b[ord(c) - 97] += 1
        ans = []
        for i, c in enumerate(s):
            a[ord(c) - 97] += 1
            if i >= len(p): a[ord(s[i - len(p)]) - 97] -= 1
            if a == b: ans.append(i - len(p) + 1)
        return ans
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> a(26), b(26), ans;
        for (char c : p) ++b[c - 'a'];
        for (int i = 0; i < s.size(); ++i) {
            ++a[s[i] - 'a'];
            if (i >= p.size()) --a[s[i - p.size()] - 'a'];
            if (a == b) ans.push_back(i - p.size() + 1);
        }
        return ans;
    }
};
```

## 10. 和为 K 的子数组
思路：前缀和加哈希表统计之前出现过多少个 `sum-k`。

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        d = defaultdict(int); d[0] = 1
        s = ans = 0
        for x in nums:
            s += x
            ans += d[s - k]
            d[s] += 1
        return ans
```

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> mp{{0,1}};
        int s = 0, ans = 0;
        for (int x : nums) {
            s += x;
            if (mp.count(s - k)) ans += mp[s - k];
            ++mp[s];
        }
        return ans;
    }
};
```

## 11. 滑动窗口最大值
思路：单调队列维护窗口内可能成为最大值的下标。

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q, ans = deque(), []
        for i, x in enumerate(nums):
            while q and nums[q[-1]] <= x: q.pop()
            q.append(i)
            if q[0] <= i - k: q.popleft()
            if i >= k - 1: ans.append(nums[q[0]])
        return ans
```

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> q;
        vector<int> ans;
        for (int i = 0; i < nums.size(); ++i) {
            while (!q.empty() && nums[q.back()] <= nums[i]) q.pop_back();
            q.push_back(i);
            if (q.front() <= i - k) q.pop_front();
            if (i >= k - 1) ans.push_back(nums[q.front()]);
        }
        return ans;
    }
};
```

## 12. 最小覆盖子串
思路：窗口先扩到满足条件，再尽量收缩左边界。

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t); miss = len(t); l = 0; st = 0; n = inf
        for r, c in enumerate(s):
            if need[c] > 0: miss -= 1
            need[c] -= 1
            while miss == 0:
                if r - l + 1 < n: st, n = l, r - l + 1
                need[s[l]] += 1
                if need[s[l]] > 0: miss += 1
                l += 1
        return s[st:st + n] if n < inf else ""
```

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char,int> need;
        for (char c : t) ++need[c];
        int miss = t.size(), l = 0, st = 0, len = INT_MAX;
        for (int r = 0; r < s.size(); ++r) {
            if (need[s[r]]-- > 0) --miss;
            while (!miss) {
                if (r - l + 1 < len) st = l, len = r - l + 1;
                if (++need[s[l++]] > 0) ++miss;
            }
        }
        return len == INT_MAX ? "" : s.substr(st, len);
    }
};
```

## 13. 最大子数组和
思路：以当前位置结尾的最优值只和前一个状态有关。

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur = ans = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            ans = max(ans, cur)
        return ans
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], ans = nums[0];
        for (int i = 1; i < nums.size(); ++i) {
            cur = max(nums[i], cur + nums[i]);
            ans = max(ans, cur);
        }
        return ans;
    }
};
```

## 14. 合并区间
思路：按左端点排序后顺序合并重叠区间。

```python
class Solution:
    def merge(self, a: List[List[int]]) -> List[List[int]]:
        a.sort()
        ans = []
        for l, r in a:
            if not ans or ans[-1][1] < l: ans.append([l, r])
            else: ans[-1][1] = max(ans[-1][1], r)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& a) {
        sort(a.begin(), a.end());
        vector<vector<int>> ans;
        for (auto& v : a) {
            if (ans.empty() || ans.back()[1] < v[0]) ans.push_back(v);
            else ans.back()[1] = max(ans.back()[1], v[1]);
        }
        return ans;
    }
};
```

## 15. 轮转数组
思路：整体反转，再分别反转前后两段。

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        k %= len(nums)
        nums[:] = nums[::-1]
        nums[:k] = nums[:k][::-1]
        nums[k:] = nums[k:][::-1]
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k %= nums.size();
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```

## 16. 除自身以外数组的乘积
思路：前缀积和后缀积各扫一遍，不用除法。

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        ans = [1] * len(nums)
        p = 1
        for i, x in enumerate(nums):
            ans[i] = p
            p *= x
        p = 1
        for i in range(len(nums) - 1, -1, -1):
            ans[i] *= p
            p *= nums[i]
        return ans
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size(), p = 1;
        vector<int> ans(n, 1);
        for (int i = 0; i < n; ++i) ans[i] = p, p *= nums[i];
        p = 1;
        for (int i = n - 1; i >= 0; --i) ans[i] *= p, p *= nums[i];
        return ans;
    }
};
```

## 17. 缺失的第一个正数
思路：把值 `x` 放到下标 `x-1` 的位置上，最后找第一个不匹配处。

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                j = nums[i] - 1
                nums[i], nums[j] = nums[j], nums[i]
        for i, x in enumerate(nums):
            if x != i + 1: return i + 1
        return n + 1
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i)
            while (1 <= nums[i] && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[i], nums[nums[i] - 1]);
        for (int i = 0; i < n; ++i) if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
};
```

## 18. 矩阵置零
思路：首行首列当标记位，额外空间压到常数级。

```python
class Solution:
    def setZeroes(self, a: List[List[int]]) -> None:
        r0 = any(x == 0 for x in a[0])
        c0 = any(a[i][0] == 0 for i in range(len(a)))
        for i in range(1, len(a)):
            for j in range(1, len(a[0])):
                if a[i][j] == 0: a[i][0] = a[0][j] = 0
        for i in range(1, len(a)):
            for j in range(1, len(a[0])):
                if a[i][0] == 0 or a[0][j] == 0: a[i][j] = 0
        if r0: a[0] = [0] * len(a[0])
        if c0:
            for row in a: row[0] = 0
```

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& a) {
        int m = a.size(), n = a[0].size();
        bool r0 = false, c0 = false;
        for (int j = 0; j < n; ++j) r0 |= a[0][j] == 0;
        for (int i = 0; i < m; ++i) c0 |= a[i][0] == 0;
        for (int i = 1; i < m; ++i)
            for (int j = 1; j < n; ++j)
                if (!a[i][j]) a[i][0] = a[0][j] = 0;
        for (int i = 1; i < m; ++i)
            for (int j = 1; j < n; ++j)
                if (!a[i][0] || !a[0][j]) a[i][j] = 0;
        if (r0) for (int j = 0; j < n; ++j) a[0][j] = 0;
        if (c0) for (int i = 0; i < m; ++i) a[i][0] = 0;
    }
};
```

## 19. 螺旋矩阵
思路：维护上下左右四条边，按层遍历。

```python
class Solution:
    def spiralOrder(self, a: List[List[int]]) -> List[int]:
        u, d, l, r, ans = 0, len(a) - 1, 0, len(a[0]) - 1, []
        while l <= r and u <= d:
            for j in range(l, r + 1): ans.append(a[u][j])
            for i in range(u + 1, d + 1): ans.append(a[i][r])
            if u < d and l < r:
                for j in range(r - 1, l - 1, -1): ans.append(a[d][j])
                for i in range(d - 1, u, -1): ans.append(a[i][l])
            u += 1; d -= 1; l += 1; r -= 1
        return ans
```

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& a) {
        int u = 0, d = a.size() - 1, l = 0, r = a[0].size() - 1;
        vector<int> ans;
        while (l <= r && u <= d) {
            for (int j = l; j <= r; ++j) ans.push_back(a[u][j]);
            for (int i = u + 1; i <= d; ++i) ans.push_back(a[i][r]);
            if (u < d && l < r) {
                for (int j = r - 1; j >= l; --j) ans.push_back(a[d][j]);
                for (int i = d - 1; i > u; --i) ans.push_back(a[i][l]);
            }
            ++u; --d; ++l; --r;
        }
        return ans;
    }
};
```

## 20. 旋转图像
思路：先转置，再每一行左右翻转。

```python
class Solution:
    def rotate(self, a: List[List[int]]) -> None:
        n = len(a)
        for i in range(n):
            for j in range(i):
                a[i][j], a[j][i] = a[j][i], a[i][j]
        for row in a: row.reverse()
```

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& a) {
        int n = a.size();
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < i; ++j)
                swap(a[i][j], a[j][i]);
        for (auto& row : a) reverse(row.begin(), row.end());
    }
};
```

## 21. 搜索二维矩阵 II
思路：从右上角出发，大了左移，小了下移。

```python
class Solution:
    def searchMatrix(self, a: List[List[int]], target: int) -> bool:
        i, j = 0, len(a[0]) - 1
        while i < len(a) and j >= 0:
            if a[i][j] == target: return True
            if a[i][j] > target: j -= 1
            else: i += 1
        return False
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& a, int target) {
        int i = 0, j = a[0].size() - 1;
        while (i < a.size() && j >= 0) {
            if (a[i][j] == target) return true;
            if (a[i][j] > target) --j;
            else ++i;
        }
        return false;
    }
};
```

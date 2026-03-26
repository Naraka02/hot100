# 04 Greedy To Tricks

## 77. 跳跃游戏
思路：维护当前最远可达位置，扫到不了的位置就失败。

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        far = 0
        for i, x in enumerate(nums):
            if i > far: return False
            far = max(far, i + x)
        return True
```

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int far = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (i > far) return false;
            far = max(far, i + nums[i]);
        }
        return true;
    }
};
```

## 78. 跳跃游戏 II
思路：按层贪心，当前一步能覆盖的区间扫完就加一步。

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        end = far = ans = 0
        for i in range(len(nums) - 1):
            far = max(far, i + nums[i])
            if i == end:
                ans += 1
                end = far
        return ans
```

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int end = 0, far = 0, ans = 0;
        for (int i = 0; i < nums.size() - 1; ++i) {
            far = max(far, i + nums[i]);
            if (i == end) ++ans, end = far;
        }
        return ans;
    }
};
```

## 79. 划分字母区间
思路：每段右端点取这一段所有字符最后出现位置的最大值。

```python
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last = {c: i for i, c in enumerate(s)}
        ans = []; st = end = 0
        for i, c in enumerate(s):
            end = max(end, last[c])
            if i == end:
                ans.append(end - st + 1)
                st = i + 1
        return ans
```

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> last(26);
        for (int i = 0; i < s.size(); ++i) last[s[i] - 'a'] = i;
        vector<int> ans;
        int st = 0, end = 0;
        for (int i = 0; i < s.size(); ++i) {
            end = max(end, last[s[i] - 'a']);
            if (i == end) ans.push_back(end - st + 1), st = i + 1;
        }
        return ans;
    }
};
```

## 80. 爬楼梯
思路：本质是斐波那契。

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        a, b = 1, 1
        for _ in range(n): a, b = b, a + b
        return a
```

```cpp
class Solution {
public:
    int climbStairs(int n) {
        int a = 1, b = 1;
        while (n--) tie(a, b) = pair{b, a + b};
        return a;
    }
};
```

## 81. 杨辉三角
思路：每一行由上一行相邻两个数相加得到。

```python
class Solution:
    def generate(self, n: int) -> List[List[int]]:
        ans = []
        for i in range(n):
            row = [1] * (i + 1)
            for j in range(1, i): row[j] = ans[-1][j - 1] + ans[-1][j]
            ans.append(row)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> generate(int n) {
        vector<vector<int>> ans;
        for (int i = 0; i < n; ++i) {
            ans.push_back(vector<int>(i + 1, 1));
            for (int j = 1; j < i; ++j) ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j];
        }
        return ans;
    }
};
```

## 82. 打家劫舍
思路：当前位置只有偷和不偷两种转移。

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        a = b = 0
        for x in nums: a, b = b, max(b, a + x)
        return b
```

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int a = 0, b = 0;
        for (int x : nums) tie(a, b) = pair{b, max(b, a + x)};
        return b;
    }
};
```

## 83. 完全平方数
思路：完全背包，状态是凑出每个数的最少平方数个数。

```python
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [0] + [inf] * n
        for x in range(1, int(n ** 0.5) + 1):
            s = x * x
            for i in range(s, n + 1):
                dp[i] = min(dp[i], dp[i - s] + 1)
        return dp[n]
```

```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, 1e9);
        dp[0] = 0;
        for (int x = 1; x * x <= n; ++x) {
            int s = x * x;
            for (int i = s; i <= n; ++i) dp[i] = min(dp[i], dp[i - s] + 1);
        }
        return dp[n];
    }
};
```

## 84. 零钱兑换
思路：完全背包求最少硬币数。

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [0] + [inf] * amount
        for c in coins:
            for i in range(c, amount + 1):
                dp[i] = min(dp[i], dp[i - c] + 1)
        return -1 if dp[amount] == inf else dp[amount]
```

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, 1e9);
        dp[0] = 0;
        for (int c : coins)
            for (int i = c; i <= amount; ++i)
                dp[i] = min(dp[i], dp[i - c] + 1);
        return dp[amount] == 1e9 ? -1 : dp[amount];
    }
};
```

## 85. 单词拆分
思路：`dp[i]` 表示前 `i` 个字符能否拆出，枚举最后一个单词。

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        st = set(wordDict)
        dp = [True] + [False] * len(s)
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in st:
                    dp[i] = True
                    break
        return dp[-1]
```

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> st(wordDict.begin(), wordDict.end());
        vector<int> dp(s.size() + 1);
        dp[0] = 1;
        for (int i = 1; i <= s.size(); ++i)
            for (int j = 0; j < i; ++j)
                if (dp[j] && st.count(s.substr(j, i - j))) { dp[i] = 1; break; }
        return dp[s.size()];
    }
};
```

## 86. 最长递增子序列
思路：维护每个长度的最小结尾，用二分更新。

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        d = []
        for x in nums:
            i = bisect_left(d, x)
            if i == len(d): d.append(x)
            else: d[i] = x
        return len(d)
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> d;
        for (int x : nums) {
            auto it = lower_bound(d.begin(), d.end(), x);
            if (it == d.end()) d.push_back(x);
            else *it = x;
        }
        return d.size();
    }
};
```

## 87. 乘积最大子数组
思路：负数会让最大最小互换，所以两者都要维护。

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        mx = mn = ans = nums[0]
        for x in nums[1:]:
            if x < 0: mx, mn = mn, mx
            mx = max(x, mx * x)
            mn = min(x, mn * x)
            ans = max(ans, mx)
        return ans
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int mx = nums[0], mn = nums[0], ans = nums[0];
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] < 0) swap(mx, mn);
            mx = max(nums[i], mx * nums[i]);
            mn = min(nums[i], mn * nums[i]);
            ans = max(ans, mx);
        }
        return ans;
    }
};
```

## 88. 分割等和子集
思路：转成 0/1 背包，看能否凑出总和一半。

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)
        if s & 1: return False
        t = s // 2
        dp = [True] + [False] * t
        for x in nums:
            for i in range(t, x - 1, -1):
                dp[i] |= dp[i - x]
        return dp[t]
```

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int s = accumulate(nums.begin(), nums.end(), 0);
        if (s & 1) return false;
        int t = s / 2;
        vector<int> dp(t + 1);
        dp[0] = 1;
        for (int x : nums)
            for (int i = t; i >= x; --i)
                dp[i] |= dp[i - x];
        return dp[t];
    }
};
```

## 89. 最长有效括号
思路：`dp[i]` 表示以 `i` 结尾的最长合法括号长度。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        dp = [0] * len(s)
        ans = 0
        for i in range(1, len(s)):
            if s[i] == ')':
                j = i - dp[i - 1] - 1
                if j >= 0 and s[j] == '(':
                    dp[i] = dp[i - 1] + 2 + (dp[j - 1] if j else 0)
                    ans = max(ans, dp[i])
        return ans
```

```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        vector<int> dp(s.size());
        int ans = 0;
        for (int i = 1; i < s.size(); ++i) if (s[i] == ')') {
            int j = i - dp[i - 1] - 1;
            if (j >= 0 && s[j] == '(') {
                dp[i] = dp[i - 1] + 2 + (j ? dp[j - 1] : 0);
                ans = max(ans, dp[i]);
            }
        }
        return ans;
    }
};
```

## 90. 不同路径
思路：只能从上或左过来，二维 DP 即可。

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; ++i)
            for (int j = 1; j < n; ++j)
                dp[j] += dp[j - 1];
        return dp.back();
    }
};
```

## 91. 最小路径和
思路：到每个格子的最小代价等于上方和左方较小值加自己。

```python
class Solution:
    def minPathSum(self, g: List[List[int]]) -> int:
        m, n = len(g), len(g[0])
        dp = [inf] * n
        dp[0] = 0
        for i in range(m):
            dp[0] += g[i][0]
            for j in range(1, n):
                dp[j] = min(dp[j], dp[j - 1]) + g[i][j]
        return dp[-1]
```

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<int> dp(n, 1e9);
        dp[0] = 0;
        for (int i = 0; i < m; ++i) {
            dp[0] += g[i][0];
            for (int j = 1; j < n; ++j) dp[j] = min(dp[j], dp[j - 1]) + g[i][j];
        }
        return dp[n - 1];
    }
};
```

## 92. 最长回文子串
思路：从每个中心向两边扩展。

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        ans = ''
        for i in range(len(s)):
            for l, r in ((i, i), (i, i + 1)):
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    if r - l + 1 > len(ans): ans = s[l:r + 1]
                    l -= 1; r += 1
        return ans
```

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        string ans;
        auto f = [&](int l, int r) {
            while (l >= 0 && r < s.size() && s[l] == s[r]) {
                if (r - l + 1 > ans.size()) ans = s.substr(l, r - l + 1);
                --l; ++r;
            }
        };
        for (int i = 0; i < s.size(); ++i) f(i, i), f(i, i + 1);
        return ans;
    }
};
```

## 93. 最长公共子序列
思路：字符相等就继承左上角加一，否则取上和左最大值。

```python
class Solution:
    def longestCommonSubsequence(self, a: str, b: str) -> int:
        dp = [0] * (len(b) + 1)
        for x in a:
            pre = 0
            for j, y in enumerate(b, 1):
                pre, dp[j] = dp[j], pre + 1 if x == y else max(dp[j], dp[j - 1])
        return dp[-1]
```

```cpp
class Solution {
public:
    int longestCommonSubsequence(string a, string b) {
        vector<int> dp(b.size() + 1);
        for (char x : a) {
            int pre = 0;
            for (int j = 1; j <= b.size(); ++j) {
                int cur = dp[j];
                dp[j] = x == b[j - 1] ? pre + 1 : max(dp[j], dp[j - 1]);
                pre = cur;
            }
        }
        return dp.back();
    }
};
```

## 94. 编辑距离
思路：插入、删除、替换三种操作取最小。

```python
class Solution:
    def minDistance(self, a: str, b: str) -> int:
        dp = list(range(len(b) + 1))
        for i, x in enumerate(a, 1):
            pre = dp[0]; dp[0] = i
            for j, y in enumerate(b, 1):
                pre, dp[j] = dp[j], pre if x == y else 1 + min(pre, dp[j], dp[j - 1])
        return dp[-1]
```

```cpp
class Solution {
public:
    int minDistance(string a, string b) {
        vector<int> dp(b.size() + 1);
        iota(dp.begin(), dp.end(), 0);
        for (int i = 1; i <= a.size(); ++i) {
            int pre = dp[0];
            dp[0] = i;
            for (int j = 1; j <= b.size(); ++j) {
                int cur = dp[j];
                dp[j] = a[i - 1] == b[j - 1] ? pre : 1 + min({pre, dp[j], dp[j - 1]});
                pre = cur;
            }
        }
        return dp.back();
    }
};
```

## 95. 多数元素
思路：Boyer-Moore 投票，抵消不同元素后剩下的就是候选。

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        c = cnt = 0
        for x in nums:
            if cnt == 0: c = x
            cnt += 1 if x == c else -1
        return c
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int c = 0, cnt = 0;
        for (int x : nums) {
            if (!cnt) c = x;
            cnt += x == c ? 1 : -1;
        }
        return c;
    }
};
```

## 96. 颜色分类
思路：荷兰国旗问题，三指针一次遍历。

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        l = i = 0; r = len(nums) - 1
        while i <= r:
            if nums[i] == 0:
                nums[l], nums[i] = nums[i], nums[l]
                l += 1; i += 1
            elif nums[i] == 2:
                nums[r], nums[i] = nums[i], nums[r]
                r -= 1
            else: i += 1
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int l = 0, i = 0, r = nums.size() - 1;
        while (i <= r) {
            if (nums[i] == 0) swap(nums[l++], nums[i++]);
            else if (nums[i] == 2) swap(nums[r--], nums[i]);
            else ++i;
        }
    }
};
```

## 97. 下一个排列
思路：从右往左找第一个下降点，再和右边刚好更大的数交换并翻转后缀。

```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]: i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]: j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])
```

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = nums.size() - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) --i;
        if (i >= 0) {
            int j = nums.size() - 1;
            while (nums[j] <= nums[i]) --j;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

## 98. 寻找重复数
思路：把数组值当成链表 next 指针，用 Floyd 判环找入口。

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = fast = 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast: break
        slow = 0
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = 0;
        while (slow != fast) slow = nums[slow], fast = nums[fast];
        return slow;
    }
};
```

## 99. 买卖股票的最佳时机含冷冻期
思路：分别维护持有、卖出、冷冻三种状态。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        hold, sold, rest = -inf, 0, 0
        for x in prices:
            hold, sold, rest = max(hold, rest - x), hold + x, max(rest, sold)
        return max(sold, rest)
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int hold = INT_MIN, sold = 0, rest = 0;
        for (int x : prices) {
            int h = max(hold, rest - x), s = hold + x, r = max(rest, sold);
            hold = h; sold = s; rest = r;
        }
        return max(sold, rest);
    }
};
```

## 100. 最大正方形
思路：以 `(i,j)` 为右下角的正方形边长取决于左、上、左上最小值。

```python
class Solution:
    def maximalSquare(self, a: List[List[str]]) -> int:
        n = len(a[0]); dp = [0] * (n + 1); ans = 0
        for row in a:
            pre = 0
            for j, c in enumerate(row, 1):
                pre, dp[j] = dp[j], 1 + min(pre, dp[j], dp[j - 1]) if c == '1' else 0
                ans = max(ans, dp[j])
        return ans * ans
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& a) {
        int n = a[0].size(), ans = 0;
        vector<int> dp(n + 1);
        for (auto& row : a) {
            int pre = 0;
            for (int j = 1; j <= n; ++j) {
                int cur = dp[j];
                dp[j] = row[j - 1] == '1' ? 1 + min({pre, dp[j], dp[j - 1]}) : 0;
                ans = max(ans, dp[j]);
                pre = cur;
            }
        }
        return ans * ans;
    }
};
```

# 02 Linked List To Graph

## 22. 相交链表
思路：两个指针走完自己链表后切到另一条，长度差会被抵消。

```python
class Solution:
    def getIntersectionNode(self, a: ListNode, b: ListNode) -> ListNode:
        p, q = a, b
        while p != q:
            p = p.next if p else b
            q = q.next if q else a
        return p
```

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *a, ListNode *b) {
        auto p = a, q = b;
        while (p != q) {
            p = p ? p->next : b;
            q = q ? q->next : a;
        }
        return p;
    }
};
```

## 23. 反转链表
思路：逐个改指针方向。

```python
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        pre = None
        while head:
            head.next, pre, head = pre, head, head.next
        return pre
```

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *pre = nullptr;
        while (head) {
            auto nxt = head->next;
            head->next = pre;
            pre = head;
            head = nxt;
        }
        return pre;
    }
};
```

## 24. 回文链表
思路：快慢指针找中点，反转后半段再比较。

```python
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        pre = None
        while slow:
            slow.next, pre, slow = pre, slow, slow.next
        while pre:
            if head.val != pre.val: return False
            head, pre = head.next, pre.next
        return True
```

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) slow = slow->next, fast = fast->next->next;
        ListNode *pre = nullptr;
        while (slow) {
            auto nxt = slow->next;
            slow->next = pre;
            pre = slow;
            slow = nxt;
        }
        while (pre) {
            if (head->val != pre->val) return false;
            head = head->next;
            pre = pre->next;
        }
        return true;
    }
};
```

## 25. 环形链表
思路：快慢指针能相遇就有环。

```python
class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast: return True
        return False
```

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```

## 26. 环形链表 II
思路：相遇后一个从头开始走，再次相遇点就是入环点。

```python
class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                p = head
                while p != slow:
                    p = p.next
                    slow = slow.next
                return p
```

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                auto p = head;
                while (p != slow) p = p->next, slow = slow->next;
                return p;
            }
        }
        return nullptr;
    }
};
```

## 27. 合并两个有序链表
思路：双指针按小的节点接到答案后面。

```python
class Solution:
    def mergeTwoLists(self, a: ListNode, b: ListNode) -> ListNode:
        d = cur = ListNode()
        while a and b:
            if a.val < b.val: cur.next, a = a, a.next
            else: cur.next, b = b, b.next
            cur = cur.next
        cur.next = a or b
        return d.next
```

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
        ListNode d, *cur = &d;
        while (a && b) {
            if (a->val < b->val) cur->next = a, a = a->next;
            else cur->next = b, b = b->next;
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return d.next;
    }
};
```

## 28. 两数相加
思路：模拟竖式加法并维护进位。

```python
class Solution:
    def addTwoNumbers(self, a: ListNode, b: ListNode) -> ListNode:
        d = cur = ListNode(); c = 0
        while a or b or c:
            s = (a.val if a else 0) + (b.val if b else 0) + c
            c, x = divmod(s, 10)
            cur.next = ListNode(x)
            cur = cur.next
            a = a.next if a else None
            b = b.next if b else None
        return d.next
```

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* a, ListNode* b) {
        ListNode d, *cur = &d;
        int c = 0;
        while (a || b || c) {
            int s = (a ? a->val : 0) + (b ? b->val : 0) + c;
            c = s / 10;
            cur->next = new ListNode(s % 10);
            cur = cur->next;
            if (a) a = a->next;
            if (b) b = b->next;
        }
        return d.next;
    }
};
```

## 29. 删除链表的倒数第 N 个结点
思路：快指针先走 `n` 步，再同步前进。

```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        d = ListNode(0, head)
        fast = slow = d
        for _ in range(n): fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return d.next
```

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode d(0, head), *fast = &d, *slow = &d;
        while (n--) fast = fast->next;
        while (fast->next) fast = fast->next, slow = slow->next;
        slow->next = slow->next->next;
        return d.next;
    }
};
```

## 30. 两两交换链表中的节点
思路：每次把两个节点局部重连。

```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        d = ListNode(0, head); p = d
        while p.next and p.next.next:
            a, b = p.next, p.next.next
            p.next, a.next, b.next = b, b.next, a
            p = a
        return d.next
```

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode d(0, head), *p = &d;
        while (p->next && p->next->next) {
            auto a = p->next, b = a->next;
            p->next = b;
            a->next = b->next;
            b->next = a;
            p = a;
        }
        return d.next;
    }
};
```

## 31. K 个一组翻转链表
思路：每段先看够不够 `k` 个，够的话原地翻转这一段。

```python
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        d = ListNode(0, head); pre = d
        while True:
            tail = pre
            for _ in range(k):
                tail = tail.next
                if not tail: return d.next
            cur, nxt = pre.next, tail.next
            p = cur
            while p != nxt:
                p.next, cur, p = cur, p, p.next
            a = pre.next
            pre.next.next = nxt
            pre.next = tail
            pre = a
```

```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode d(0, head), *pre = &d;
        while (true) {
            auto tail = pre;
            for (int i = 0; i < k; ++i) {
                tail = tail->next;
                if (!tail) return d.next;
            }
            auto cur = pre->next, nxt = tail->next, p = cur, rev = nxt;
            while (p != nxt) {
                auto t = p->next;
                p->next = rev;
                rev = p;
                p = t;
            }
            auto a = pre->next;
            pre->next = tail;
            pre = a;
        }
    }
};
```

## 32. 随机链表的复制
思路：哈希表记录原节点和新节点的映射。

```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        d = {None: None}
        p = head
        while p:
            d[p] = Node(p.val)
            p = p.next
        p = head
        while p:
            d[p].next = d[p.next]
            d[p].random = d[p.random]
            p = p.next
        return d[head]
```

```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        unordered_map<Node*, Node*> mp;
        mp[nullptr] = nullptr;
        for (auto p = head; p; p = p->next) mp[p] = new Node(p->val);
        for (auto p = head; p; p = p->next) {
            mp[p]->next = mp[p->next];
            mp[p]->random = mp[p->random];
        }
        return mp[head];
    }
};
```

## 33. 排序链表
思路：链表适合用归并排序。

```python
class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next: return head
        slow = fast = head; pre = None
        while fast and fast.next:
            pre = slow
            slow = slow.next
            fast = fast.next.next
        pre.next = None
        a, b = self.sortList(head), self.sortList(slow)
        d = cur = ListNode()
        while a and b:
            if a.val < b.val: cur.next, a = a, a.next
            else: cur.next, b = b, b.next
            cur = cur.next
        cur.next = a or b
        return d.next
```

```cpp
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head, *pre = nullptr;
        while (fast && fast->next) {
            pre = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        pre->next = nullptr;
        auto a = sortList(head), b = sortList(slow);
        ListNode d, *cur = &d;
        while (a && b) {
            if (a->val < b->val) cur->next = a, a = a->next;
            else cur->next = b, b = b->next;
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return d.next;
    }
};
```

## 34. 合并 K 个升序链表
思路：小根堆每次取当前最小节点。

```python
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        h = []
        for i, p in enumerate(lists):
            if p: heappush(h, (p.val, i, p))
        d = cur = ListNode()
        while h:
            _, i, p = heappop(h)
            cur.next = p
            cur = cur.next
            if p.next: heappush(h, (p.next.val, i, p.next))
        return d.next
```

```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
        for (auto p : lists) if (p) pq.push(p);
        ListNode d, *cur = &d;
        while (!pq.empty()) {
            auto p = pq.top(); pq.pop();
            cur->next = p; cur = cur->next;
            if (p->next) pq.push(p->next);
        }
        return d.next;
    }
};
```

## 35. LRU 缓存
思路：哈希表定位节点，双向链表维护最近使用顺序。

```python
class LRUCache:
    def __init__(self, c: int):
        self.c = c
        self.d = {}
        self.l = Node(0, 0); self.r = Node(0, 0)
        self.l.next = self.r; self.r.prev = self.l
    def rm(self, x):
        x.prev.next = x.next; x.next.prev = x.prev
    def add(self, x):
        x.prev = self.r.prev; x.next = self.r
        self.r.prev.next = x; self.r.prev = x
    def get(self, key: int) -> int:
        if key not in self.d: return -1
        x = self.d[key]; self.rm(x); self.add(x); return x.val
    def put(self, key: int, value: int) -> None:
        if key in self.d: self.rm(self.d[key])
        x = Node(key, value); self.d[key] = x; self.add(x)
        if len(self.d) > self.c:
            x = self.l.next; self.rm(x); del self.d[x.key]
```

```cpp
class LRUCache {
    int cap;
    list<pair<int,int>> lst;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        auto it = mp[key];
        lst.splice(lst.end(), lst, it);
        return it->second;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            auto it = mp[key];
            it->second = value;
            lst.splice(lst.end(), lst, it);
        } else {
            lst.push_back({key, value});
            mp[key] = prev(lst.end());
            if (mp.size() > cap) {
                mp.erase(lst.front().first);
                lst.pop_front();
            }
        }
    }
};
```

## 36. 二叉树的中序遍历
思路：递归左根右。

```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if not root: return []
        return (
            self.inorderTraversal(root.left)
            + [root.val]
            + self.inorderTraversal(root.right)
        )
```

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        if (!root) return {};
        auto a = inorderTraversal(root->left), b = inorderTraversal(root->right);
        a.push_back(root->val);
        a.insert(a.end(), b.begin(), b.end());
        return a;
    }
};
```

## 37. 二叉树的最大深度
思路：答案就是左右子树深度最大值加一。

```python
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        return 0 if not root else 1 + max(
            self.maxDepth(root.left),
            self.maxDepth(root.right),
        )
```

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        return !root ? 0 : 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```

## 38. 翻转二叉树
思路：交换每个节点的左右子树。

```python
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root:
            root.left, root.right = (
                self.invertTree(root.right),
                self.invertTree(root.left),
            )
        return root
```

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```

## 39. 对称二叉树
思路：同时比较左子树的左边和右子树的右边。

```python
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        def f(a, b):
            return (
                (not a and not b)
                or (
                    a and b
                    and a.val == b.val
                    and f(a.left, b.right)
                    and f(a.right, b.left)
                )
            )
        return f(root.left, root.right)
```

```cpp
class Solution {
public:
    bool f(TreeNode* a, TreeNode* b) {
        return (!a && !b) || (
            a && b &&
            a->val == b->val &&
            f(a->left, b->right) &&
            f(a->right, b->left)
        );
    }
    bool isSymmetric(TreeNode* root) { return f(root->left, root->right); }
};
```

## 40. 二叉树的直径
思路：每个节点处尝试用左右子树高度之和更新答案。

```python
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node: return 0
            l, r = dfs(node.left), dfs(node.right)
            ans = max(ans, l + r)
            return 1 + max(l, r)
        dfs(root)
        return ans
```

```cpp
class Solution {
public:
    int ans = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int l = dfs(node->left), r = dfs(node->right);
        ans = max(ans, l + r);
        return 1 + max(l, r);
    }
    int diameterOfBinaryTree(TreeNode* root) { dfs(root); return ans; }
};
```

## 41. 二叉树的层序遍历
思路：BFS 一层一层出队。

```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root: return []
        q, ans = deque([root]), []
        while q:
            ans.append([x.val for x in q])
            for _ in range(len(q)):
                x = q.popleft()
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
        return ans
```

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        queue<TreeNode*> q; q.push(root);
        vector<vector<int>> ans;
        while (!q.empty()) {
            int n = q.size();
            ans.push_back({});
            while (n--) {
                auto x = q.front(); q.pop();
                ans.back().push_back(x->val);
                if (x->left) q.push(x->left);
                if (x->right) q.push(x->right);
            }
        }
        return ans;
    }
};
```

## 42. 将有序数组转换为二叉搜索树
思路：每次取中点作为根节点即可平衡。

```python
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums: return None
        m = len(nums) // 2
        return TreeNode(
            nums[m],
            self.sortedArrayToBST(nums[:m]),
            self.sortedArrayToBST(nums[m + 1:]),
        )
```

```cpp
class Solution {
public:
    TreeNode* f(vector<int>& a, int l, int r) {
        if (l > r) return nullptr;
        int m = (l + r) >> 1;
        return new TreeNode(a[m], f(a, l, m - 1), f(a, m + 1, r));
    }
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return f(nums, 0, nums.size() - 1);
    }
};
```

## 43. 验证二叉搜索树
思路：BST 的中序遍历必须严格递增。

```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        pre = -inf
        def dfs(node):
            nonlocal pre
            if not node: return True
            if not dfs(node.left) or node.val <= pre: return False
            pre = node.val
            return dfs(node.right)
        return dfs(root)
```

```cpp
class Solution {
public:
    long long pre = LLONG_MIN;
    bool isValidBST(TreeNode* root) {
        if (!root) return true;
        if (!isValidBST(root->left) || root->val <= pre) return false;
        pre = root->val;
        return isValidBST(root->right);
    }
};
```

## 44. 二叉搜索树中第 K 小的元素
思路：BST 中序遍历就是升序，第 `k` 个即答案。

```python
class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        st = []
        while True:
            while root: st.append(root); root = root.left
            root = st.pop()
            k -= 1
            if not k: return root.val
            root = root.right
```

```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        while (true) {
            while (root) st.push(root), root = root->left;
            root = st.top(); st.pop();
            if (!--k) return root->val;
            root = root->right;
        }
    }
};
```

## 45. 二叉树的右视图
思路：层序遍历时取每层最后一个节点。

```python
class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        if not root: return []
        q, ans = deque([root]), []
        while q:
            ans.append(q[-1].val)
            for _ in range(len(q)):
                x = q.popleft()
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
        return ans
```

```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        queue<TreeNode*> q; q.push(root);
        vector<int> ans;
        while (!q.empty()) {
            int n = q.size();
            for (int i = 0; i < n; ++i) {
                auto x = q.front(); q.pop();
                if (i == n - 1) ans.push_back(x->val);
                if (x->left) q.push(x->left);
                if (x->right) q.push(x->right);
            }
        }
        return ans;
    }
};
```

## 46. 二叉树展开为链表
思路：后序处理，返回时把左子树接到右边再拼原右子树。

```python
class Solution:
    def flatten(self, root: TreeNode) -> None:
        def dfs(node):
            if not node: return None
            l = dfs(node.left); r = dfs(node.right)
            if l:
                p = l
                while p.right: p = p.right
                p.right = node.right
                node.right = node.left
                node.left = None
            return node
        dfs(root)
```

```cpp
class Solution {
public:
    void flatten(TreeNode* root) {
        if (!root) return;
        flatten(root->left);
        flatten(root->right);
        auto l = root->left, r = root->right;
        root->left = nullptr;
        root->right = l;
        auto p = root;
        while (p->right) p = p->right;
        p->right = r;
    }
};
```

## 47. 从前序与中序遍历序列构造二叉树
思路：前序首元素是根，在中序里切开左右子树。

```python
class Solution:
    def buildTree(self, pre: List[int], ino: List[int]) -> TreeNode:
        d = {x: i for i, x in enumerate(ino)}
        def dfs(pl, pr, il, ir):
            if pl > pr: return None
            x = pre[pl]; k = d[x]; left = k - il
            return TreeNode(
                x,
                dfs(pl + 1, pl + left, il, k - 1),
                dfs(pl + left + 1, pr, k + 1, ir),
            )
        return dfs(0, len(pre) - 1, 0, len(ino) - 1)
```

```cpp
class Solution {
public:
    unordered_map<int,int> mp;
    TreeNode* dfs(vector<int>& pre, int pl, int pr, int il, int ir) {
        if (pl > pr) return nullptr;
        int x = pre[pl], k = mp[x], left = k - il;
        return new TreeNode(x,
            dfs(pre, pl + 1, pl + left, il, k - 1),
            dfs(pre, pl + left + 1, pr, k + 1, ir));
    }
    TreeNode* buildTree(vector<int>& pre, vector<int>& ino) {
        for (int i = 0; i < ino.size(); ++i) mp[ino[i]] = i;
        return dfs(pre, 0, pre.size() - 1, 0, ino.size() - 1);
    }
};
```

## 48. 路径总和 III
思路：前缀和统计从祖先到当前节点的路径数。

```python
class Solution:
    def pathSum(self, root: TreeNode, target: int) -> int:
        d = defaultdict(int); d[0] = 1
        def dfs(node, s):
            if not node: return 0
            s += node.val
            ans = d[s - target]
            d[s] += 1
            ans += dfs(node.left, s) + dfs(node.right, s)
            d[s] -= 1
            return ans
        return dfs(root, 0)
```

```cpp
class Solution {
public:
    unordered_map<long long,int> mp;
    int target;
    int dfs(TreeNode* node, long long s) {
        if (!node) return 0;
        s += node->val;
        int ans = mp[s - target];
        ++mp[s];
        ans += dfs(node->left, s) + dfs(node->right, s);
        --mp[s];
        return ans;
    }
    int pathSum(TreeNode* root, int t) {
        target = t; mp[0] = 1;
        return dfs(root, 0);
    }
};
```

## 49. 二叉树的最近公共祖先
思路：左右子树分别找到目标时，当前节点就是最近公共祖先。

```python
class Solution:
    def lowestCommonAncestor(
        self, root: TreeNode, p: TreeNode, q: TreeNode
    ) -> TreeNode:
        if not root or root in (p, q): return root
        l = self.lowestCommonAncestor(root.left, p, q)
        r = self.lowestCommonAncestor(root.right, p, q)
        return root if l and r else l or r
```

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        auto l = lowestCommonAncestor(root->left, p, q);
        auto r = lowestCommonAncestor(root->right, p, q);
        return l && r ? root : l ? l : r;
    }
};
```

## 50. 二叉树中的最大路径和
思路：向上只能选一侧贡献，但答案可以在当前节点同时取左右两边。

```python
class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        ans = -inf
        def dfs(node):
            nonlocal ans
            if not node: return 0
            l = max(dfs(node.left), 0)
            r = max(dfs(node.right), 0)
            ans = max(ans, node.val + l + r)
            return node.val + max(l, r)
        dfs(root)
        return ans
```

```cpp
class Solution {
public:
    int ans = INT_MIN;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int l = max(dfs(node->left), 0), r = max(dfs(node->right), 0);
        ans = max(ans, node->val + l + r);
        return node->val + max(l, r);
    }
    int maxPathSum(TreeNode* root) { dfs(root); return ans; }
};
```

## 51. 岛屿数量
思路：遇到陆地就 DFS/BFS 淹没整座岛。

```python
class Solution:
    def numIslands(self, g: List[List[str]]) -> int:
        m, n, ans = len(g), len(g[0]), 0
        def dfs(i, j):
            if i < 0 or i == m or j < 0 or j == n or g[i][j] != '1': return
            g[i][j] = '0'
            dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1)
        for i in range(m):
            for j in range(n):
                if g[i][j] == '1':
                    ans += 1
                    dfs(i, j)
        return ans
```

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& g) {
        int m = g.size(), n = g[0].size(), ans = 0;
        function<void(int,int)> dfs = [&](int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n || g[i][j] != '1') return;
            g[i][j] = '0';
            dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
        };
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                if (g[i][j] == '1') ++ans, dfs(i, j);
        return ans;
    }
};
```

## 52. 腐烂的橘子
思路：多源 BFS，同一层代表同一分钟。

```python
class Solution:
    def orangesRotting(self, g: List[List[int]]) -> int:
        m, n = len(g), len(g[0])
        q = deque()
        fresh = 0
        for i in range(m):
            for j in range(n):
                if g[i][j] == 2: q.append((i, j))
                elif g[i][j] == 1: fresh += 1
        ans = 0
        for _ in iter(int, 1):
            if not q or not fresh: break
            for _ in range(len(q)):
                i, j = q.popleft()
                for x, y in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
                    if 0 <= x < m and 0 <= y < n and g[x][y] == 1:
                        g[x][y] = 2; fresh -= 1; q.append((x, y))
            ans += 1
        return ans if not fresh else -1
```

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size(), fresh = 0, ans = 0;
        queue<pair<int,int>> q;
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                if (g[i][j] == 2) q.push({i, j});
                else if (g[i][j] == 1) ++fresh;
        while (!q.empty() && fresh) {
            int sz = q.size();
            while (sz--) {
                auto [i, j] = q.front(); q.pop();
                int d[5] = {1, 0, -1, 0, 1};
                for (int k = 0; k < 4; ++k) {
                    int x = i + d[k], y = j + d[k + 1];
                    if (0 <= x && x < m && 0 <= y && y < n && g[x][y] == 1) {
                        g[x][y] = 2; --fresh; q.push({x, y});
                    }
                }
            }
            ++ans;
        }
        return fresh ? -1 : ans;
    }
};
```

## 53. 课程表
思路：拓扑排序，看能否删完所有点。

```python
class Solution:
    def canFinish(self, n: int, pre: List[List[int]]) -> bool:
        g = [[] for _ in range(n)]
        deg = [0] * n
        for a, b in pre:
            g[b].append(a)
            deg[a] += 1
        q = deque(i for i, x in enumerate(deg) if x == 0)
        cnt = 0
        while q:
            x = q.popleft(); cnt += 1
            for y in g[x]:
                deg[y] -= 1
                if deg[y] == 0: q.append(y)
        return cnt == n
```

```cpp
class Solution {
public:
    bool canFinish(int n, vector<vector<int>>& pre) {
        vector<vector<int>> g(n);
        vector<int> deg(n);
        for (auto& e : pre) g[e[1]].push_back(e[0]), ++deg[e[0]];
        queue<int> q;
        for (int i = 0; i < n; ++i) if (!deg[i]) q.push(i);
        int cnt = 0;
        while (!q.empty()) {
            int x = q.front(); q.pop(); ++cnt;
            for (int y : g[x]) if (!--deg[y]) q.push(y);
        }
        return cnt == n;
    }
};
```

## 54. 实现 Trie（前缀树）
思路：树上按字符逐层走，结尾打标记。

```python
class Trie:
    def __init__(self):
        self.ch = {}
        self.end = False
    def insert(self, word: str) -> None:
        p = self
        for c in word:
            p.ch.setdefault(c, Trie())
            p = p.ch[c]
        p.end = True
    def search(self, word: str) -> bool:
        p = self
        for c in word:
            if c not in p.ch: return False
            p = p.ch[c]
        return p.end
    def startsWith(self, prefix: str) -> bool:
        p = self
        for c in prefix:
            if c not in p.ch: return False
            p = p.ch[c]
        return True
```

```cpp
class Trie {
    Trie* ch[26]{};
    bool end = false;
public:
    void insert(string word) {
        auto p = this;
        for (char c : word) {
            int i = c - 'a';
            if (!p->ch[i]) p->ch[i] = new Trie();
            p = p->ch[i];
        }
        p->end = true;
    }
    bool search(string word) {
        auto p = this;
        for (char c : word) {
            int i = c - 'a';
            if (!p->ch[i]) return false;
            p = p->ch[i];
        }
        return p->end;
    }
    bool startsWith(string prefix) {
        auto p = this;
        for (char c : prefix) {
            int i = c - 'a';
            if (!p->ch[i]) return false;
            p = p->ch[i];
        }
        return true;
    }
};
```

---
title: "Quick Select & Top-K"
title_zh: "快速选择与 Top-K"
icon: "🎯"
excerpt: "Selection algorithm for finding k-th element in O(n) average time"
excerpt_zh: "平均 O(n) 时间复杂度的选择算法"
tags: ["Selection", "Top-K", "LC 215", "LC 347"]
---

<div class="algorithm-detail">
  <div class="page-header">
    <a href="/algorithm/" class="back-link">
      <span class="lang-en">← Back to Algorithm</span>
      <span class="lang-zh">← 返回算法列表</span>
    </a>
    <h1>
      <span class="lang-en">Quick Select & Top-K Problems</span>
      <span class="lang-zh">快速选择与 Top-K 问题</span>
    </h1>
  </div>

  <div class="intro-section">
    <p class="lang-en">Quick Select is a selection algorithm derived from Quick Sort. Instead of recursing into both sides, it only recurses into the side containing the k-th element, achieving O(n) average time complexity.</p>
    <p class="lang-zh">快速选择是由快速排序衍生的选择算法。与快排不同，它只递归包含第 k 个元素的那一侧，从而达到平均 O(n) 的时间复杂度。</p>

    <div class="complexity-badge">
      <span class="lang-en">Average: O(n) | Worst: O(n²) | Space: O(1)</span>
      <span class="lang-zh">平均：O(n) | 最坏：O(n²) | 空间：O(1)</span>
    </div>
  </div>

  <div class="problem-section">
    <div class="leetcode-problem">
      <div class="problem-header">
        <span class="problem-number">LC 215</span>
        <a href="https://leetcode.cn/problems/kth-largest-element-in-an-array/" target="_blank" class="leetcode-link">
          <span class="lang-en">Kth Largest Element in an Array</span>
          <span class="lang-zh">数组中的第K个最大元素</span>
          <svg class="link-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg>
        </a>
      </div>

      <p class="problem-desc lang-en">Given an integer array nums and an integer k, return the k-th largest element in the array. Note that it is the k-th largest element in the sorted order, not the k-th distinct element.</p>
      <p class="problem-desc lang-zh">给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。</p>

      <div class="key-insight">
        <h4 class="lang-en">Key Insight</h4>
        <h4 class="lang-zh">关键思路</h4>
        <p class="lang-en">The k-th largest = (n-k)-th smallest (0-indexed). Use Quick Select to find the element at index n-k after partitioning.</p>
        <p class="lang-zh">第 k 大 = 第 (n-k) 小（0索引）。使用快速选择找到分区后索引为 n-k 的元素。</p>
      </div>

      <div class="code-tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="cpp-215">C++</button>
          <button class="tab-btn" data-tab="py-215">Python</button>
        </div>

        <div class="tab-content active" id="cpp-215">
          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Lomuto Partition (Iterative)</span>
              <span class="lang-zh">Lomuto 分区（迭代）</span>
            </div>
<pre><code class="language-cpp">class Solution {
public:
    int findKthLargest(vector&lt;int&gt;&amp; nums, int k) {
        srand(time(0));
        int left = 0, right = nums.size() - 1;
        int target = nums.size() - k;

        while (left &lt;= right) {
            int pi = partition(nums, left, right);
            if (pi == target) return nums[pi];
            else if (pi &lt; target) left = pi + 1;
            else right = pi - 1;
        }
        return -1;
    }

private:
    int partition(vector&lt;int&gt;&amp; nums, int left, int right) {
        int pivot_idx = left + rand() % (right - left + 1);
        int pivot = nums[pivot_idx];
        swap(nums[pivot_idx], nums[right]);

        int store_idx = left;
        for (int i = left; i &lt; right; ++i) {
            if (nums[i] &lt; pivot)
                swap(nums[store_idx++], nums[i]);
        }
        swap(nums[right], nums[store_idx]);
        return store_idx;
    }
};</code></pre>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Hoare Partition (Recursive)</span>
              <span class="lang-zh">Hoare 分区（递归）</span>
            </div>
<pre><code class="language-cpp">class Solution {
public:
    int findKthLargest(vector&lt;int&gt;&amp; nums, int k) {
        return quickSelect(nums, 0, nums.size() - 1, nums.size() - k);
    }

private:
    int quickSelect(vector&lt;int&gt;&amp; nums, int l, int r, int k) {
        if (l == r) return nums[k];

        int pivot = nums[l], i = l - 1, j = r + 1;
        while (i &lt; j) {
            do i++; while (nums[i] &lt; pivot);
            do j--; while (nums[j] &gt; pivot);
            if (i &lt; j) swap(nums[i], nums[j]);
        }

        if (k &lt;= j) return quickSelect(nums, l, j, k);
        else return quickSelect(nums, j + 1, r, k);
    }
};</code></pre>
          </div>
        </div>

        <div class="tab-content" id="py-215">
          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Hoare Partition</span>
              <span class="lang-zh">Hoare 分区</span>
            </div>
<pre><code class="language-python">class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return self._quick_select(nums, 0, len(nums) - 1, len(nums) - k)

    def _quick_select(self, nums: List[int], low: int, high: int, k: int) -> int:
        if low == high:
            return nums[k]

        pivot = nums[low]
        i, j = low - 1, high + 1

        while i &lt; j:
            i += 1
            while nums[i] &lt; pivot:
                i += 1
            j -= 1
            while nums[j] &gt; pivot:
                j -= 1
            if i &lt; j:
                nums[i], nums[j] = nums[j], nums[i]

        if k &lt;= j:
            return self._quick_select(nums, low, j, k)
        else:
            return self._quick_select(nums, j + 1, high, k)</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="leetcode-problem">
      <div class="problem-header">
        <span class="problem-number">LC 347</span>
        <a href="https://leetcode.cn/problems/top-k-frequent-elements/" target="_blank" class="leetcode-link">
          <span class="lang-en">Top K Frequent Elements</span>
          <span class="lang-zh">前 K 个高频元素</span>
          <svg class="link-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg>
        </a>
      </div>

      <p class="problem-desc lang-en">Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Time complexity must be better than O(n log n).</p>
      <p class="problem-desc lang-zh">给你一个整数数组 nums 和一个整数 k，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。时间复杂度必须优于 O(n log n)。</p>

      <div class="solution-approaches">
        <h4 class="lang-en">Two Approaches</h4>
        <h4 class="lang-zh">两种方法</h4>
        <div class="approach-grid">
          <div class="approach-card">
            <h5>Quick Select</h5>
            <p class="lang-en">Find the k-th highest frequency threshold, then collect all elements with frequency ≥ threshold.</p>
            <p class="lang-zh">找到第 k 高的频率阈值，然后收集所有频率 ≥ 阈值的元素。</p>
            <span class="complexity">O(n) avg</span>
          </div>
          <div class="approach-card">
            <h5>Bucket Sort</h5>
            <p class="lang-en">Use frequency as bucket index. Iterate from highest frequency bucket to collect k elements.</p>
            <p class="lang-zh">使用频率作为桶索引。从最高频率的桶开始迭代，收集 k 个元素。</p>
            <span class="complexity">O(n)</span>
          </div>
        </div>
      </div>

      <div class="code-tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="cpp-347">C++</button>
          <button class="tab-btn" data-tab="py-347">Python</button>
        </div>

        <div class="tab-content active" id="cpp-347">
          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Quick Select Solution</span>
              <span class="lang-zh">快速选择解法</span>
            </div>
<pre><code class="language-cpp">class Solution {
public:
    vector&lt;int&gt; topKFrequent(vector&lt;int&gt;&amp; nums, int k) {
        unordered_map&lt;int, int&gt; freq;
        for (int num : nums) freq[num]++;

        vector&lt;int&gt; freq_vals;
        for (const auto&amp; p : freq)
            freq_vals.push_back(p.second);

        int kth = quickSelect(freq_vals, 0, freq_vals.size() - 1,
                              freq_vals.size() - k);

        vector&lt;int&gt; result;
        for (const auto&amp; p : freq)
            if (p.second &gt;= kth)
                result.push_back(p.first);
        return result;
    }

private:
    int quickSelect(vector&lt;int&gt;&amp; nums, int l, int r, int k) {
        if (l == r) return nums[k];
        int pivot = nums[l], i = l - 1, j = r + 1;
        while (i &lt; j) {
            do i++; while (nums[i] &lt; pivot);
            do j--; while (nums[j] &gt; pivot);
            if (i &lt; j) swap(nums[i], nums[j]);
        }
        if (k &lt;= j) return quickSelect(nums, l, j, k);
        else return quickSelect(nums, j + 1, r, k);
    }
};</code></pre>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Bucket Sort Solution</span>
              <span class="lang-zh">桶排序解法</span>
            </div>
<pre><code class="language-cpp">class Solution {
public:
    vector&lt;int&gt; topKFrequent(vector&lt;int&gt;&amp; nums, int k) {
        unordered_map&lt;int, int&gt; freq;
        for (int num : nums) freq[num]++;

        vector&lt;vector&lt;int&gt;&gt; buckets(nums.size() + 1);
        for (const auto&amp; p : freq)
            buckets[p.second].push_back(p.first);

        vector&lt;int&gt; result;
        for (int i = buckets.size() - 1; i &gt;= 0 &amp;&amp; result.size() &lt; k; --i) {
            if (!buckets[i].empty())
                result.insert(result.end(), buckets[i].begin(), buckets[i].end());
        }
        return result;
    }
};</code></pre>
          </div>
        </div>

        <div class="tab-content" id="py-347">
          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Quick Select Solution</span>
              <span class="lang-zh">快速选择解法</span>
            </div>
<pre><code class="language-python">class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = {}
        for num in nums:
            freq[num] = freq.get(num, 0) + 1

        freq_vals = list(freq.values())
        kth = self._quick_select(freq_vals, 0, len(freq_vals) - 1,
                                  len(freq_vals) - k)

        return [num for num, f in freq.items() if f &gt;= kth]

    def _quick_select(self, nums: List[int], low: int, high: int, k: int) -> int:
        if low == high:
            return nums[k]

        pivot = nums[low]
        i, j = low - 1, high + 1
        while i &lt; j:
            i += 1
            while nums[i] &lt; pivot: i += 1
            j -= 1
            while nums[j] &gt; pivot: j -= 1
            if i &lt; j:
                nums[i], nums[j] = nums[j], nums[i]

        if k &lt;= j:
            return self._quick_select(nums, low, j, k)
        else:
            return self._quick_select(nums, j + 1, high, k)</code></pre>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="lang-en">Bucket Sort Solution</span>
              <span class="lang-zh">桶排序解法</span>
            </div>
<pre><code class="language-python">class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = {}
        for num in nums:
            freq[num] = freq.get(num, 0) + 1

        buckets = [[] for _ in range(len(nums) + 1)]
        for num, f in freq.items():
            buckets[f].append(num)

        result = []
        for i in range(len(buckets) - 1, 0, -1):
            for num in buckets[i]:
                result.append(num)
                if len(result) &gt;= k:
                    return result
        return result</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="comparison-section">
    <h2>
      <span class="lang-en">Method Comparison</span>
      <span class="lang-zh">方法对比</span>
    </h2>
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="lang-en">Method</th>
          <th class="lang-zh">方法</th>
          <th class="lang-en">Time</th>
          <th class="lang-zh">时间</th>
          <th class="lang-en">Space</th>
          <th class="lang-zh">空间</th>
          <th class="lang-en">Pros</th>
          <th class="lang-zh">优点</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Quick Select</td>
          <td>O(n) avg</td>
          <td>O(1)</td>
          <td class="lang-en">In-place, good average case</td>
          <td class="lang-zh">原地操作，平均情况好</td>
        </tr>
        <tr>
          <td>Bucket Sort</td>
          <td>O(n)</td>
          <td>O(n)</td>
          <td class="lang-en">Guaranteed O(n), stable</td>
          <td class="lang-zh">保证 O(n)，稳定</td>
        </tr>
        <tr>
          <td>Heap</td>
          <td>O(n log k)</td>
          <td>O(k)</td>
          <td class="lang-en">Good when k is small</td>
          <td class="lang-zh">k 较小时效果好</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="related-section">
    <h2>
      <span class="lang-en">Related</span>
      <span class="lang-zh">相关内容</span>
    </h2>
    <div class="related-links">
      <a href="/algorithm/quick-sort/" class="related-card">
        <span class="problem-tag">Foundation</span>
        <span class="lang-en">Quick Sort</span>
        <span class="lang-zh">快速排序</span>
      </a>
    </div>
  </div>
</div>

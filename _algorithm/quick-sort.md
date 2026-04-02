---
title: "Quick Sort"
title_zh: "快速排序"
icon: "⚡"
excerpt: "Classic divide-and-conquer sorting with Lomuto & Hoare partition"
excerpt_zh: "经典分治排序，Lomuto 与 Hoare 分区方案"
tags: ["Sorting", "Divide & Conquer"]
---

<div class="algorithm-detail">
  <div class="page-header">
    <a href="/algorithm/" class="back-link">
      <span class="lang-en">← Back to Algorithm</span>
      <span class="lang-zh" style="display: none;">← 返回算法列表</span>
    </a>
    <h1>
      <span class="lang-en">Quick Sort</span>
      <span class="lang-zh" style="display: none;">快速排序</span>
    </h1>
  </div>

  <div class="intro-section">
    <p class="lang-en">Quick Sort is a highly efficient, comparison-based sorting algorithm using the divide-and-conquer strategy. It works by selecting a 'pivot' element and partitioning the array around it.</p>
    <p class="lang-zh" style="display: none;">快速排序是一种高效的基于比较的排序算法，采用分治策略。它通过选择一个"基准"元素，将数组围绕基准进行分区。</p>

    <div class="complexity-badge">
      <span class="lang-en">Average: O(n log n) | Worst: O(n²) | Space: O(log n)</span>
      <span class="lang-zh" style="display: none;">平均：O(n log n) | 最坏：O(n²) | 空间：O(log n)</span>
    </div>
  </div>

  <div class="partition-section">
    <h2>
      <span class="lang-en">Partition Schemes</span>
      <span class="lang-zh" style="display: none;">分区方案</span>
    </h2>

    <div class="partition-grid">
      <div class="partition-card lomuto">
        <h3>Lomuto Partition</h3>
        <div class="partition-desc">
          <p class="lang-en">Uses a single pointer to track the boundary of elements smaller than pivot. Simple but less efficient.</p>
          <p class="lang-zh" style="display: none;">使用单指针追踪小于基准元素的边界。简单但效率较低。</p>
        </div>
        <ul class="lang-en">
          <li>Single pointer traversal</li>
          <li>~n/2 swaps on average</li>
          <li>Maintains relative order</li>
          <li>Poor performance with duplicates</li>
        </ul>
        <ul class="lang-zh" style="display: none;">
          <li>单指针遍历</li>
          <li>平均约 n/2 次交换</li>
          <li>保持相对顺序</li>
          <li>重复元素时性能差</li>
        </ul>
      </div>

      <div class="partition-card hoare">
        <h3>Hoare Partition</h3>
        <div class="partition-desc">
          <p class="lang-en">Uses two pointers moving towards each other. More efficient in practice with fewer swaps.</p>
          <p class="lang-zh" style="display: none;">使用双指针相向移动。实际中更高效，交换次数更少。</p>
        </div>
        <ul class="lang-en">
          <li>Two-pointer approach</li>
          <li>~n/3 swaps on average</li>
          <li>Better cache performance</li>
          <li>Handles duplicates well</li>
        </ul>
        <ul class="lang-zh" style="display: none;">
          <li>双指针方法</li>
          <li>平均约 n/3 次交换</li>
          <li>更好的缓存性能</li>
          <li>重复元素处理更好</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="code-section">
    <h2>
      <span class="lang-en">Implementation</span>
      <span class="lang-zh" style="display: none;">代码实现</span>
    </h2>

    <div class="code-tabs">
      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="cpp">C++</button>
        <button class="tab-btn" data-tab="python">Python</button>
      </div>

      <div class="tab-content active" id="cpp">
        <div class="code-block">
          <div class="code-header">Lomuto Partition</div>
<pre><code class="language-cpp">void quickSort(vector&lt;int&gt;&amp; nums, int left, int right) {
    if (left &gt;= right) return;
    int pi = partition(nums, left, right);
    quickSort(nums, left, pi - 1);
    quickSort(nums, pi + 1, right);
}

int partition(vector&lt;int&gt;&amp; nums, int left, int right) {
    // Random pivot to avoid worst case
    int pivot_idx = left + rand() % (right - left + 1);
    int pivot = nums[pivot_idx];
    swap(nums[pivot_idx], nums[right]);

    int store_idx = left;
    for (int i = left; i &lt; right; ++i) {
        if (nums[i] &lt; pivot) {
            swap(nums[store_idx++], nums[i]);
        }
    }
    swap(nums[right], nums[store_idx]);
    return store_idx;
}</code></pre>
        </div>

        <div class="code-block">
          <div class="code-header">Hoare Partition</div>
<pre><code class="language-cpp">void quickSort(vector&lt;int&gt;&amp; nums, int l, int r) {
    if (l &gt;= r) return;
    int pivot = nums[l], i = l - 1, j = r + 1;
    while (i &lt; j) {
        do i++; while (nums[i] &lt; pivot);
        do j--; while (nums[j] &gt; pivot);
        if (i &lt; j) swap(nums[i], nums[j]);
    }
    quickSort(nums, l, j);
    quickSort(nums, j + 1, r);
}</code></pre>
        </div>
      </div>

      <div class="tab-content" id="python">
        <div class="code-block">
          <div class="code-header">Lomuto Partition</div>
<pre><code class="language-python">def quick_sort(nums: List[int], left: int, right: int) -> None:
    if left >= right:
        return
    pi = partition(nums, left, right)
    quick_sort(nums, left, pi - 1)
    quick_sort(nums, pi + 1, right)

def partition(nums: List[int], left: int, right: int) -> int:
    pivot_idx = random.randint(left, right)
    pivot = nums[pivot_idx]
    nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]

    store_idx = left
    for i in range(left, right):
        if nums[i] < pivot:
            nums[store_idx], nums[i] = nums[i], nums[store_idx]
            store_idx += 1
    nums[right], nums[store_idx] = nums[store_idx], nums[right]
    return store_idx</code></pre>
        </div>

        <div class="code-block">
          <div class="code-header">Hoare Partition</div>
<pre><code class="language-python">def quick_sort(nums: List[int], l: int, r: int) -> None:
    if l >= r:
        return
    pivot = nums[l]
    i, j = l - 1, r + 1
    while i < j:
        i += 1
        while nums[i] < pivot:
            i += 1
        j -= 1
        while nums[j] > pivot:
            j -= 1
        if i < j:
            nums[i], nums[j] = nums[j], nums[i]
    quick_sort(nums, l, j)
    quick_sort(nums, j + 1, r)</code></pre>
        </div>
      </div>
    </div>
  </div>

  <div class="related-section">
    <h2>
      <span class="lang-en">Related Problems</span>
      <span class="lang-zh" style="display: none;">相关题目</span>
    </h2>
    <div class="related-links">
      <a href="/algorithm/quick-select/" class="related-card">
        <span class="problem-tag">LC 215 / LC 347</span>
        <span class="lang-en">Quick Select & Top-K</span>
        <span class="lang-zh" style="display: none;">快速选择与 Top-K</span>
      </a>
    </div>
  </div>
</div>

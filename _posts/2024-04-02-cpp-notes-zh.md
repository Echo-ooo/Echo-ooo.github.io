---
title: "C++ 自动驾驶开发笔记"
date: 2024-04-02
categories:
  - programming
lang: zh
slug: cpp-notes
excerpt: "智能指针、STL容器、TensorRT推理及性能优化技术。"
---

# C++

C++ 是生产环境部署和实时系统的核心语言。

## 主要应用

- 高性能推理 (TensorRT)
- 实时系统集成
- ROS/ROS2 开发
- 传感器 SDK 集成

---

## 智能指针

### std::make_shared vs new + std::shared_ptr

`std::make_shared` 是 C++11 引入的特性，它提供了一种更安全、更高效的方式来创建共享指针。

#### make_shared 的优点

- **内存分配优化**：使用单一内存分配来同时分配控制块和对象本身，减少内存分配次数
- **更少的内存开销**：在一个连续的内存块中存储控制块和对象
- **异常安全**：如果对象的构造抛出异常，能够确保不会出现内存泄漏
- **简洁性**：语法简洁，减少了需要显式写构造函数的代码

```cpp
auto ptr = std::make_shared<MyClass>(args...);
```

#### new + shared_ptr 的特点

如果直接使用 `new`，则需要显式创建 `std::shared_ptr` 并传入裸指针：

- **内存分配**：`new` 分配对象内存，`std::shared_ptr` 需要额外分配控制块，共两次分配
- **异常安全**：不如 `std::make_shared`，如果 `new` 抛出异常，`std::shared_ptr` 可能不会被正确初始化
- **语法冗长**：更加冗长，且不够直观

```cpp
std::shared_ptr<MyClass> ptr(new MyClass(constructor_args...));
```

#### 何时使用 new

尽管 `std::make_shared` 很有用，但有些情况仍然需要直接使用 `new`：

- **自定义分配器**：`std::make_shared` 不支持自定义分配器
- **旧版 C++ 标准**：C++03 中 `std::make_shared` 不可用
- **底层控制**：需要特殊的内存对齐等精细控制
- **动态类型分配**：需要通过 `new` 动态分配基类指针

#### 示例对比

**使用 std::make_shared：**

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass(int a, int b) : a_(a), b_(b) {
        std::cout << "MyClass constructor called\n";
    }

    ~MyClass() {
        std::cout << "MyClass destructor called\n";
    }

    void print() const {
        std::cout << "a: " << a_ << ", b: " << b_ << std::endl;
    }

private:
    int a_, b_;
};

int main() {
    // 使用 std::make_shared 创建 shared_ptr
    auto ptr = std::make_shared<MyClass>(10, 20);
    ptr->print();  // 输出: a: 10, b: 20
    return 0;
}
```

**使用 new + std::shared_ptr：**

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass(int a, int b) : a_(a), b_(b) {
        std::cout << "MyClass constructor called\n";
    }

    ~MyClass() {
        std::cout << "MyClass destructor called\n";
    }

    void print() const {
        std::cout << "a: " << a_ << ", b: " << b_ << std::endl;
    }

private:
    int a_, b_;
};

int main() {
    // 使用 new 创建对象并用 std::shared_ptr 管理
    std::shared_ptr<MyClass> ptr(new MyClass(30, 40));
    ptr->print();  // 输出: a: 30, b: 40
    return 0;
}
```

### unique_ptr 与 shared_ptr

```cpp
#include <memory>

// unique_ptr - 独占所有权
std::unique_ptr<float[]> buffer = std::make_unique<float[]>(1024);

// shared_ptr - 共享所有权
std::shared_ptr<Model> model = std::make_shared<Model>();
```

---

## STL 容器

### vector

```cpp
#include <vector>

// vector 用于动态数组
std::vector<float> points;
points.reserve(10000);  // 预分配以提高性能
```

#### 遍历 vector 并删除元素

**方法 1：倒序遍历**

倒序遍历时，删除操作不会影响尚未处理的元素，因为删除的元素在当前元素的后面。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    // 倒序遍历并删除所有偶数
    for (int i = vec.size() - 1; i >= 0; --i) {
        if (vec[i] % 2 == 0) {
            vec.erase(vec.begin() + i);
        }
    }

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

**方法 2：std::remove_if + erase（推荐）**

`std::remove_if` 将要删除的元素移到容器末尾并返回迭代器，然后用 `erase` 删除。这种方法既简洁又高效。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    // 删除所有偶数
    vec.erase(std::remove_if(vec.begin(), vec.end(), [](int value) {
        return value % 2 == 0;
    }), vec.end());

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

**方法 3：迭代器遍历**

通过手动管理迭代器，可以安全地在遍历过程中删除元素。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    for (auto it = vec.begin(); it != vec.end(); ) {
        if (*it % 2 == 0) {
            it = vec.erase(it);  // 删除并更新迭代器
        } else {
            ++it;  // 仅当未删除时才递增迭代器
        }
    }

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

> **注意**：当调用 `vec.erase(it)` 时，`erase` 返回指向被删除元素之后位置的迭代器。如果删除后继续使用原始迭代器，会导致迭代器失效，可能访问已删除的元素或跳过某些元素。

#### 为什么倒序遍历更安全

| 遍历方式 | 删除影响 | 安全性 |
|---------|---------|--------|
| 倒序遍历 | 删除操作不影响尚未处理的元素 | 安全 |
| 正序遍历 | 删除后所有后续元素向前移动，索引变化 | 需要额外处理 |

**正序遍历删除的正确写法：**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    for (size_t i = 0; i < vec.size(); ++i) {
        if (vec[i] % 2 == 0) {
            vec.erase(vec.begin() + i);
            --i;  // 调整索引以处理新元素
        }
    }

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

> **警告**：以 `vec = {1, 2, 3, 4, 5, 6}` 为例，不调整索引会导致：`i = 1` 时删除 `2`，vec 变成 `{1, 3, 4, 5, 6}`，`i` 变成 `2`，此时 `vec[2]` 是 `4`，元素 `3` 被跳过。

---

### unordered_map

`unordered_map` 是一种关联容器，使用哈希表作为底层存储结构，提供 O(1) 平均时间复杂度的查找、插入和删除操作。

```cpp
#include <unordered_map>

// 哈希表用于快速查找
std::unordered_map<int, BoundingBox> detections;
```

#### 删除元素的方法

**方法 1：at + erase**

使用 `at` 确保键存在，配合 `try-catch` 处理异常。

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> umap = {
        {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}
    };

    try {
        umap.at(2);     // 访问键为 2 的元素
        umap.erase(2);  // 删除键为 2 的元素
    } catch (const std::out_of_range& e) {
        std::cerr << "Key not found: " << e.what() << '\n';
    }

    for (const auto& pair : umap) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
    return 0;
}
```

**方法 2：find + erase（推荐）**

`find` 返回迭代器，避免异常处理，效率高且代码简洁。

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> umap = {
        {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}
    };

    auto it = umap.find(2);
    if (it != umap.end()) {
        umap.erase(it);
    }

    for (const auto& pair : umap) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
    return 0;
}
```

**方法 3：迭代器遍历删除**

适用于基于条件删除多个元素的场景。

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> umap = {
        {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}
    };

    for (auto it = umap.begin(); it != umap.end(); ) {
        if (it->second > "two") {
            it = umap.erase(it);  // erase 返回下一个迭代器
        } else {
            ++it;
        }
    }

    for (const auto& pair : umap) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
    return 0;
}
```

#### 删除方法对比

| 方法 | 时间复杂度 | 适用场景 |
|-----|-----------|---------|
| find + erase | O(1) | 删除特定键，推荐 |
| at + erase | O(1) | 需要异常处理时 |
| 迭代器遍历 | O(n) | 基于条件删除多个元素 |

---

## TensorRT 推理

```cpp
#include <NvInfer.h>

class TRTInference {
public:
    bool loadEngine(const std::string& engine_path);
    bool infer(const float* input, float* output);

private:
    nvinfer1::IRuntime* runtime_;
    nvinfer1::ICudaEngine* engine_;
    nvinfer1::IExecutionContext* context_;
};
```

---

## 点云处理

```cpp
#include <vector>
#include <fstream>

struct Point {
    float x, y, z, intensity;
};

std::vector<Point> loadPointCloud(const std::string& bin_path) {
    std::ifstream file(bin_path, std::ios::binary);
    file.seekg(0, std::ios::end);
    size_t size = file.tellg();
    file.seekg(0, std::ios::beg);

    size_t num_points = size / sizeof(Point);
    std::vector<Point> points(num_points);
    file.read(reinterpret_cast<char*>(points.data()), size);

    return points;
}
```

---

## 内存管理

> **内存安全提示**
> - 始终使用 RAII（资源获取即初始化）
> - 优先使用智能指针而非裸指针
> - 使用 `std::vector` 代替 C 风格数组
> - 使用 Valgrind 或 AddressSanitizer 检查内存泄漏

---

## 性能优化

### SIMD 指令

```cpp
#include <immintrin.h>

void vectorAdd(const float* a, const float* b, float* c, int n) {
    for (int i = 0; i < n; i += 8) {
        __m256 va = _mm256_loadu_ps(a + i);
        __m256 vb = _mm256_loadu_ps(b + i);
        __m256 vc = _mm256_add_ps(va, vb);
        _mm256_storeu_ps(c + i, vc);
    }
}
```

---

## 构建系统

### CMake 示例

```cmake
cmake_minimum_required(VERSION 3.18)
project(perception_inference)

find_package(CUDA REQUIRED)
find_package(OpenCV REQUIRED)

add_executable(inference
    src/main.cpp
    src/trt_inference.cpp
)

target_link_libraries(inference
    ${OpenCV_LIBS}
    nvinfer
    cudart
)
```

---

## 资源

- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
- [TensorRT 文档](https://docs.nvidia.com/deeplearning/tensorrt/)
- [现代 C++ 特性](https://github.com/AnthonyCalandra/modern-cpp-features)

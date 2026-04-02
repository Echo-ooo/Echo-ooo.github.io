---
title: "C++ Notes for Autonomous Driving Development"
date: 2024-04-02
categories: programming
lang: en
slug: cpp-notes
excerpt: "Smart pointers, STL containers, TensorRT inference, and performance optimization techniques."
---

# C++

C++ is the core language for production deployment and real-time systems.

## Main Applications

- High-performance inference (TensorRT)
- Real-time system integration
- ROS/ROS2 development
- Sensor SDK integration

---

## Smart Pointers

### std::make_shared vs new + std::shared_ptr

`std::make_shared` is a feature introduced in C++11, providing a safer and more efficient way to create shared pointers.

#### Advantages of make_shared

- **Memory allocation optimization**: Uses a single memory allocation for both the control block and the object itself, reducing allocation count
- **Less memory overhead**: Stores the control block and object in a contiguous memory block
- **Exception safety**: If the object's constructor throws an exception, ensures no memory leak occurs
- **Simplicity**: Concise syntax, reducing code needed for explicit constructors

```cpp
auto ptr = std::make_shared<MyClass>(args...);
```

#### Characteristics of new + shared_ptr

If using `new` directly, you need to explicitly create `std::shared_ptr` and pass in the raw pointer:

- **Memory allocation**: `new` allocates object memory, `std::shared_ptr` needs additional allocation for control block, totaling two allocations
- **Exception safety**: Not as safe as `std::make_shared`; if `new` throws an exception, `std::shared_ptr` may not be properly initialized
- **Verbose syntax**: More verbose and less intuitive

```cpp
std::shared_ptr<MyClass> ptr(new MyClass(constructor_args...));
```

#### When to Use new

Although `std::make_shared` is very useful, there are cases where using `new` directly is still necessary:

- **Custom allocators**: `std::make_shared` doesn't support custom allocators
- **Older C++ standards**: `std::make_shared` is not available in C++03
- **Low-level control**: Need special memory alignment or fine-grained control
- **Dynamic type allocation**: Need to dynamically allocate base class pointers through `new`

#### Example Comparison

**Using std::make_shared:**

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
    // Create shared_ptr using std::make_shared
    auto ptr = std::make_shared<MyClass>(10, 20);
    ptr->print();  // Output: a: 10, b: 20
    return 0;
}
```

**Using new + std::shared_ptr:**

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
    // Create object using new and manage with std::shared_ptr
    std::shared_ptr<MyClass> ptr(new MyClass(30, 40));
    ptr->print();  // Output: a: 30, b: 40
    return 0;
}
```

### unique_ptr vs shared_ptr

```cpp
#include <memory>

// unique_ptr - exclusive ownership
std::unique_ptr<float[]> buffer = std::make_unique<float[]>(1024);

// shared_ptr - shared ownership
std::shared_ptr<Model> model = std::make_shared<Model>();
```

---

## STL Containers

### vector

```cpp
#include <vector>

// Vector for dynamic arrays
std::vector<float> points;
points.reserve(10000);  // Pre-allocate for performance
```

#### Traversing vector and Deleting Elements

**Method 1: Reverse Traversal**

When traversing in reverse, deletion operations don't affect elements not yet processed, since deleted elements are after the current element.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    // Reverse traverse and delete all even numbers
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

**Method 2: std::remove_if + erase (Recommended)**

`std::remove_if` moves elements to be deleted to the end of the container and returns an iterator, then use `erase` to delete them. This method is both concise and efficient.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    // Delete all even numbers
    vec.erase(std::remove_if(vec.begin(), vec.end(), [](int value) {
        return value % 2 == 0;
    }), vec.end());

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

**Method 3: Iterator Traversal**

By manually managing iterators, you can safely delete elements during traversal.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    for (auto it = vec.begin(); it != vec.end(); ) {
        if (*it % 2 == 0) {
            it = vec.erase(it);  // Delete and update iterator
        } else {
            ++it;  // Only increment iterator when not deleting
        }
    }

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

!!! note "Why only increment iterator when not deleting"
    When calling `vec.erase(it)`, `erase` returns an iterator pointing to the position after the deleted element. If you continue using the original iterator after deletion, it becomes invalid, potentially accessing deleted elements or skipping some elements.

#### Why Reverse Traversal is Safer

| Traversal Method | Deletion Impact | Safety |
|-----------------|-----------------|--------|
| Reverse traversal | Deletion doesn't affect unprocessed elements | Safe |
| Forward traversal | All subsequent elements shift forward after deletion, indices change | Requires extra handling |

**Correct way to delete during forward traversal:**

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6};

    for (size_t i = 0; i < vec.size(); ++i) {
        if (vec[i] % 2 == 0) {
            vec.erase(vec.begin() + i);
            --i;  // Adjust index to handle new element
        }
    }

    for (int num : vec) {
        std::cout << num << " ";
    }
    return 0;
}
```

!!! warning "Consequences of not adjusting index"
    Using `vec = {1, 2, 3, 4, 5, 6}` as an example:

    - At `i = 1`, delete `2`, vec becomes `{1, 3, 4, 5, 6}`
    - `i` becomes `2`, now `vec[2]` is `4`, element `3` is skipped
    - Final result is `{1, 3, 5, 6}` instead of expected `{1, 3, 5}`

---

### unordered_map

`unordered_map` is an associative container that uses a hash table as its underlying storage structure, providing O(1) average time complexity for lookup, insertion, and deletion operations.

```cpp
#include <unordered_map>

// Hash map for fast lookup
std::unordered_map<int, BoundingBox> detections;
```

#### Methods for Deleting Elements

**Method 1: at + erase**

Use `at` to ensure the key exists, with `try-catch` for exception handling.

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> umap = {
        {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}
    };

    try {
        umap.at(2);     // Access element with key 2
        umap.erase(2);  // Delete element with key 2
    } catch (const std::out_of_range& e) {
        std::cerr << "Key not found: " << e.what() << '\n';
    }

    for (const auto& pair : umap) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
    return 0;
}
```

**Method 2: find + erase (Recommended)**

`find` returns an iterator, avoiding exception handling, efficient and concise.

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

**Method 3: Iterator Traversal Deletion**

Suitable for deleting multiple elements based on conditions.

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, std::string> umap = {
        {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}
    };

    for (auto it = umap.begin(); it != umap.end(); ) {
        if (it->second > "two") {
            it = umap.erase(it);  // erase returns next iterator
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

#### Deletion Method Comparison

| Method | Time Complexity | Use Case |
|--------|----------------|----------|
| find + erase | O(1) | Delete specific key, recommended |
| at + erase | O(1) | When exception handling is needed |
| Iterator traversal | O(n) | Delete multiple elements based on conditions |

---

## TensorRT Inference

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

## Point Cloud Processing

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

## Memory Management

!!! warning "Memory Safety"
    - Always use RAII (Resource Acquisition Is Initialization)
    - Prefer smart pointers over raw pointers
    - Use `std::vector` instead of C-style arrays
    - Check for memory leaks with Valgrind or AddressSanitizer

---

## Performance Optimization

### SIMD Intrinsics

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

## Build Systems

### CMake Example

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

## Resources

- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
- [TensorRT Documentation](https://docs.nvidia.com/deeplearning/tensorrt/)
- [Modern C++ Features](https://github.com/AnthonyCalandra/modern-cpp-features)

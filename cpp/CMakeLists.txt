cmake_minimum_required (VERSION 3.0)
project(example)

add_executable(replace-me source.cpp)

find_package(sleepy-discord CONFIG REQUIRED)

add_subdirectory(deps/sleepy-discord)
target_link_libraries(replace-me sleepy-discord)

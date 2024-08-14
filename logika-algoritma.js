// 1
function ParagraphCounter(str) {
  let count = 0;
  while (str[count] != undefined) {
    count++;
  }
  return count;
}

// 2a
function deretA(n) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list[i] = i * i;
  }
  return list;
}

// 2b
function deretB(n) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list[i] = i * i + 1;
  }
  return list;
}

// 2c
function deretC(n) {
  let list = [0, 1];
  for (let i = 2; i < n; i++) {
    list[i] = list[i - 1] + list[i - 2];
  }
  return list;
}

// 2d
function deretD(n) {
  let list = [0, 0];
  for (let i = 2; i < n; i++) {
    list[i] = list[i - 1] + (list[i - 2] + 1);
  }
  return list;
}

// answer
const input =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

console.log("Nomor 1: ", ParagraphCounter(input));
console.log("Nomor 2 bagian A: ", deretA(12));
console.log("Nomor 2 bagian B: ", deretB(12));
console.log("Nomor 2 bagian C: ", deretC(12));
console.log("Nomor 2 bagian D: ", deretD(12));

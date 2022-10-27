const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: ".*.(test|spec).(j|t)s[x]?$",
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!(somePkg)|swiper)"],
};

module.exports = config;
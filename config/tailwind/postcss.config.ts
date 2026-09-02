type PostcssConfig = {
  plugins: Record<string, Record<string, never>>;
};

const config = {
  plugins: { "@tailwindcss/postcss": {} },
} satisfies PostcssConfig;

export default config;

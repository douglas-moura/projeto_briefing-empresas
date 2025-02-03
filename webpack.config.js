const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', // Pode ser 'development' ou 'production'
    entry: './src/index.ts', // Arquivo de entrada principal
    output: {
        filename: 'index.js', // Nome do arquivo gerado
        path: path.resolve(__dirname, 'dist'), // Pasta de saída
        clean: true, // Limpa a pasta `dist` antes de cada build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Processa arquivos CSS
                use: [
                    'style-loader', // Injeta CSS no DOM durante o desenvolvimento
                    'css-loader', // Lê arquivos CSS
                    'postcss-loader', // Processa o CSS com plugins (incluindo Tailwind)
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // Processa imagens
                type: 'asset/resource',
            },
            {
                test: /\.html$/, // Processa arquivos HTML
                use: ['html-loader'],
            },
            {
                test: /\.tsx?$/, // Para arquivos .ts e .tsx
                use: 'ts-loader', // Transpila TypeScript para JavaScript
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Arquivo HTML base
            filename: 'index.html', // Nome do arquivo de saída
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css', // Nome do CSS extraído
        }),
    ],
    devServer: {
        static: './dist', // Pasta servida pelo dev server
        port: 3000, // Porta do servidor local
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Permite importar arquivos sem especificar a extensão
    },
};
import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  static async getInitialProps(context) {
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(context);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="lightMode">
          <Main />
          <NextScript />
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </body>
      </Html>
    );
  }
}

export default AppDocument;

import Header from './Header.jsx';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

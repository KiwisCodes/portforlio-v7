export function Footer() {
  return (
    <footer className="py-12 border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-2">Hung</h2>
          <p className="text-text-secondary text-sm">© {new Date().getFullYear()} Thanh Hung Phan.<br/>All rights reserved.</p>
        </div>
        
        <div className="flex gap-8 text-sm">
          <a href="#about" className="hover:text-accent-gold transition-colors">About</a>
          <a href="#projects" className="hover:text-accent-gold transition-colors">Projects</a>
          <a href="#skills" className="hover:text-accent-gold transition-colors">Skills</a>
          <a href="#education" className="hover:text-accent-gold transition-colors">Education</a>
          <a href="#contact" className="hover:text-accent-gold transition-colors">Contact</a>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-text-secondary">Made with ♥ in Vietnam & Germany</p>
          <a href="#" className="text-sm inline-flex items-center gap-2 mt-2 hover:text-accent-gold transition-colors font-mono">
            [↑ Back to top]
          </a>
        </div>
      </div>
    </footer>
  );
}

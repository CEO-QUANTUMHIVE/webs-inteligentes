export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-gray-400">
          &copy; 2024 Studio Vanadium. All rights reserved.
        </p>
        <p className="text-[12px] text-gray-300">
          Powered by Quantum Hive
        </p>
      </div>
    </footer>
  );
}

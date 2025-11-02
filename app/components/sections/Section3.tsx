export default function Section3() {
  return (
    <section
      id="section-3"
      data-section="3"
      className="relative z-10 h-screen min-h-screen w-full flex items-center justify-center"
    >
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center px-8">
        {/* First Column */}
        <div className="flex items-center justify-center">
          <div className="font-geist-sans text-4xl text-black opacity-50">
            C1
          </div>
        </div>

        {/* Second Column */}
        <div className="flex items-center justify-center">
          <div className="font-geist-sans text-4xl text-black opacity-50">
            C2
          </div>
        </div>
      </div>
      {/* Camera Position: (342.74, -196.34, 709.88) */}
    </section>
  );
}

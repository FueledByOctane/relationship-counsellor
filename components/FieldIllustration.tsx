'use client';

export default function FieldIllustration() {
  return (
    <div className="w-[280px] h-[280px] mb-12 relative animate-gentle-rise">
      <div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #C4D1BE 0%, #8B9D83 50%, #5C6B56 100%)',
          boxShadow: '0 30px 60px -20px rgba(92, 107, 86, 0.3), inset 0 -20px 40px -20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%] opacity-30"
          style={{
            background: 'linear-gradient(to top, #5C6B56 0%, transparent 100%)',
          }}
        />

        {/* Grass blades */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex gap-2 items-end">
          <div className="grass w-[3px] h-[40px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[55px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[65px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[70px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[60px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[50px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
          <div className="grass w-[3px] h-[45px] rounded-sm" style={{ background: 'linear-gradient(to top, #5C6B56, #F7F4EE)' }} />
        </div>

        {/* Two figures */}
        <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 flex gap-5">
          <div className="relative">
            {/* Head */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#F7F4EE] rounded-full opacity-90" />
            {/* Body */}
            <div className="w-[6px] h-[24px] bg-[#F7F4EE] rounded-[3px] opacity-90" />
          </div>
          <div className="relative">
            {/* Head */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#F7F4EE] rounded-full opacity-90" />
            {/* Body */}
            <div className="w-[6px] h-[24px] bg-[#F7F4EE] rounded-[3px] opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

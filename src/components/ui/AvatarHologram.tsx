"use client";

/**
 * @EDIT AVATAR — Replace public/images/avatar.png or tweak filters below.
 * Search: @EDIT AVATAR
 */
export function AvatarHologram() {
  return (
    <div className="avatar-holo relative h-40 w-40 shrink-0 md:h-52 md:w-52">
      {/* Orbit rings */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-full border border-cyan/25"
        style={{ animation: "spin-slow 14s linear infinite" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-6 rounded-full border border-purple/20 border-dashed"
        style={{ animation: "spin-slow 22s linear infinite reverse" }}
        aria-hidden
      />

      {/* Glow plate */}
      <div
        className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-cyan/40 via-purple/30 to-blue/20 blur-md"
        aria-hidden
      />

      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-cyan/35 bg-bg-surface shadow-[0_0_50px_rgba(0,229,255,0.25),0_0_80px_rgba(139,92,246,0.15)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/avatar.png"
          alt="Zohaib Arshad Noor"
          className="avatar-photo h-full w-full object-cover object-[center_15%]"
        />

        {/* Cyan/purple color grade + vignette */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,229,255,0.45) 0%, transparent 45%, rgba(139,92,246,0.4) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,22,0.55) 100%)",
          }}
          aria-hidden
        />
        {/* Scanline / holographic sheen */}
        <div className="avatar-scan pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}

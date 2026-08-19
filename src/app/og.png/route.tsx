import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

/**
 * Served from a path that ends in `.png`.
 *
 * Next's conventional `opengraph-image.tsx` exports to an extensionless file,
 * which GitHub Pages hands back as application/octet-stream — enough for most
 * social crawlers to discard the preview. A route handler lets us own the
 * filename while still generating the image at build time.
 */
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#777777",
            fontSize: 22,
            letterSpacing: "0.18em",
          }}
        >
          <span style={{ color: "#B7FF3C" }}>{site.monogram}</span>
          <span>
            {site.location.city.toUpperCase()},{" "}
            {site.location.country.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#F5F5F0",
              fontSize: 118,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#777777",
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 3,
              width: "100%",
              backgroundColor: "#B7FF3C",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 22,
              color: "#777777",
              fontSize: 21,
              letterSpacing: "0.12em",
            }}
          >
            <span>{site.role.toUpperCase()}</span>
            <span>PAVANSESHUKUMAR.GITHUB.IO</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

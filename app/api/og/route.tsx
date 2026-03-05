import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic OpenGraph Image Generator
 * ──────────────────────────────────
 * Usage:  /api/og?title=My+Title&type=blog&description=Some+text
 * Params:
 *   - title (required): The headline text
 *   - type: "blog" | "service" | "page" (changes accent color/badge)
 *   - description (optional): Subtitle text
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Trawerse";
  const type = searchParams.get("type") || "page";
  const description =
    searchParams.get("description") || "Premium Development Studio";

  // Type-specific badge and accent
  const badgeMap: Record<string, { label: string; color: string }> = {
    blog: { label: "BLOG", color: "#4ade80" },
    service: { label: "SERVICE", color: "#60a5fa" },
    page: { label: "TRAWERSE", color: "#11ae62" },
  };
  const badge = badgeMap[type] || badgeMap.page;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${badge.color}20, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${badge.color}15, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "100px",
              background: `${badge.color}18`,
              border: `1px solid ${badge.color}40`,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: badge.color,
            }}
          >
            {badge.label}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? "48px" : "56px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-1px",
            marginBottom: "24px",
            maxWidth: "900px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: "750px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {description.length > 120
              ? description.substring(0, 117) + "..."
              : description}
          </div>
        )}

        {/* Bottom bar: brand + domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Brand mark */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${badge.color}, ${badge.color}80)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 800,
                color: "#0a0a0a",
              }}
            >
              T
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
                display: "flex",
              }}
            >
              TRAWERSE
            </div>
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#71717a",
              display: "flex",
            }}
          >
            trawerse.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

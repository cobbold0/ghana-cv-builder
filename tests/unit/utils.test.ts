import { describe, expect, it } from "vitest";
import { formatCvDate, formatDateRange, isEndBeforeStart, isValidCvDate, joinCvDate } from "@/lib/cv/dates";
import { cleanText, displayUrl, hrefFor, slugifyFileName, toBullets } from "@/lib/cv/text";

describe("dates", () => {
  it("formats year and month", () => {
    expect(formatCvDate("2023-03")).toBe("Mar 2023");
    expect(formatCvDate("2019")).toBe("2019");
    expect(formatCvDate("")).toBe("");
    expect(formatCvDate("2023-13")).toBe("");
  });

  it("formats ranges", () => {
    expect(formatDateRange("2020-01", "2022-06")).toBe("Jan 2020 – Jun 2022");
    expect(formatDateRange("2020-01", "", true)).toBe("Jan 2020 – Present");
    expect(formatDateRange("", "2022")).toBe("2022");
    expect(formatDateRange("2021", "2021")).toBe("2021");
  });

  it("validates dates", () => {
    expect(isValidCvDate("")).toBe(true);
    expect(isValidCvDate("2024-02")).toBe(true);
    expect(isValidCvDate("1800")).toBe(false);
    expect(isValidCvDate("24-02")).toBe(false);
  });

  it("compares start and end", () => {
    expect(isEndBeforeStart("2022-05", "2022-04")).toBe(true);
    expect(isEndBeforeStart("2022-05", "2022-05")).toBe(false);
    expect(isEndBeforeStart("2022", "2022-01")).toBe(false);
    expect(isEndBeforeStart("2022", "2021")).toBe(true);
    expect(isEndBeforeStart("", "2021")).toBe(false);
  });

  it("joins picker values", () => {
    expect(joinCvDate("2024", "3")).toBe("2024-03");
    expect(joinCvDate("2024", "")).toBe("2024");
    expect(joinCvDate("", "03")).toBe("");
  });
});

describe("text helpers", () => {
  it("removes emoji and control characters but keeps Ghanaian letters", () => {
    expect(cleanText("  Kɔfi 🎓 Ɛdem\u0007  ")).toBe("Kɔfi Ɛdem");
    expect(cleanText("GH₵ 5,000")).toBe("GH₵ 5,000");
  });

  it("splits bullets and strips typed list markers", () => {
    expect(toBullets("- First\n• Second\n\n3. Third\n  * Fourth ")).toEqual(["First", "Second", "Third", "Fourth"]);
  });

  it("formats links", () => {
    expect(displayUrl("https://www.linkedin.com/in/ama/")).toBe("linkedin.com/in/ama");
    expect(hrefFor("github.com/ama")).toBe("https://github.com/ama");
    expect(hrefFor("http://example.com")).toBe("http://example.com");
  });

  it("builds safe PDF file names", () => {
    expect(slugifyFileName("Ama Serwaa Owusu")).toBe("Ama-Serwaa-Owusu-CV.pdf");
    expect(slugifyFileName("Kɔfi Ɛdem Agbéko")).toBe("Kofi-Edem-Agbeko-CV.pdf");
    expect(slugifyFileName("")).toBe("CV.pdf");
  });
});

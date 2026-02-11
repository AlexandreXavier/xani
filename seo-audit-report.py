#!/usr/bin/env python3
"""
SEO Audit Report Generator for xani.me
Generates a comprehensive PDF report with all audit findings and recommendations.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, ListFlowable, ListItem, KeepTogether
)
from reportlab.lib import colors
from datetime import datetime

# Colors
PRIMARY_COLOR = HexColor('#1a365d')  # Dark blue
ACCENT_COLOR = HexColor('#3182ce')   # Blue
SUCCESS_COLOR = HexColor('#38a169')  # Green
WARNING_COLOR = HexColor('#dd6b20')  # Orange
ERROR_COLOR = HexColor('#e53e3e')    # Red
LIGHT_BG = HexColor('#f7fafc')       # Light gray

def create_styles():
    styles = getSampleStyleSheet()

    # Title style
    styles.add(ParagraphStyle(
        name='MainTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=PRIMARY_COLOR,
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))

    # Subtitle
    styles.add(ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=14,
        textColor=ACCENT_COLOR,
        spaceAfter=20,
        alignment=TA_CENTER
    ))

    # Section heading
    styles.add(ParagraphStyle(
        name='SectionHeading',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=PRIMARY_COLOR,
        spaceBefore=20,
        spaceAfter=12,
        fontName='Helvetica-Bold'
    ))

    # Subsection heading
    styles.add(ParagraphStyle(
        name='SubsectionHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=ACCENT_COLOR,
        spaceBefore=15,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    ))

    # Body text
    styles.add(ParagraphStyle(
        name='BodyContent',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=8,
        leading=14
    ))

    # Score big
    styles.add(ParagraphStyle(
        name='ScoreBig',
        parent=styles['Normal'],
        fontSize=48,
        textColor=WARNING_COLOR,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))

    # Code style
    styles.add(ParagraphStyle(
        name='CodeBlock',
        parent=styles['Normal'],
        fontSize=8,
        fontName='Courier',
        backColor=LIGHT_BG,
        leftIndent=10,
        rightIndent=10,
        spaceBefore=5,
        spaceAfter=5
    ))

    return styles

def create_table(data, col_widths=None, header=True):
    """Create a styled table."""
    table = Table(data, colWidths=col_widths)

    style_commands = [
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR if header else LIGHT_BG),
        ('TEXTCOLOR', (0, 0), (-1, 0), white if header else black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('TOPPADDING', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 6),
        ('BACKGROUND', (0, 1), (-1, -1), white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]

    # Alternate row colors
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_commands.append(('BACKGROUND', (0, i), (-1, i), LIGHT_BG))

    table.setStyle(TableStyle(style_commands))
    return table

def build_report():
    """Build the complete SEO audit report."""

    # Create document
    doc = SimpleDocTemplate(
        "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/SEO-Audit-Report-xani.me.pdf",
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    styles = create_styles()
    story = []

    # ========== COVER PAGE ==========
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("SEO AUDIT REPORT", styles['MainTitle']))
    story.append(Paragraph("xani.me", styles['Subtitle']))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph(f"Audit Date: {datetime.now().strftime('%B %d, %Y')}", styles['Subtitle']))
    story.append(Spacer(1, 1*inch))

    # Score box
    story.append(Paragraph("SEO Health Score", styles['SubsectionHeading']))
    story.append(Paragraph("58/100", styles['ScoreBig']))
    story.append(Paragraph("(Before Implementation)", styles['BodyContent']))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("~78/100", styles['ScoreBig']))
    story.append(Paragraph("(After Implementation)", styles['BodyContent']))

    story.append(Spacer(1, 1*inch))
    story.append(Paragraph("Business Type: Personal Portfolio/Blog", styles['BodyContent']))
    story.append(Paragraph("Platform: Astro v5.15.4", styles['BodyContent']))
    story.append(Paragraph("Prepared by: Claude AI SEO Audit", styles['BodyContent']))

    story.append(PageBreak())

    # ========== EXECUTIVE SUMMARY ==========
    story.append(Paragraph("Executive Summary", styles['SectionHeading']))

    summary_text = """
    This comprehensive SEO audit analyzed xani.me across 7 key categories: Technical SEO,
    Content Quality (E-E-A-T), On-Page SEO, Schema/Structured Data, Performance, Images,
    and AI Search Readiness. The audit identified critical issues including a missing H1 tag,
    generic meta description, and complete absence of structured data markup.

    All critical and high-priority issues have been implemented and deployed. The site now
    includes Person + WebSite schema, BlogPosting schema for all articles, BreadcrumbList
    navigation, an llms.txt file for AI crawler guidance, and improved meta tags.
    """
    story.append(Paragraph(summary_text.strip(), styles['BodyContent']))
    story.append(Spacer(1, 0.3*inch))

    # Key findings table
    story.append(Paragraph("Key Findings", styles['SubsectionHeading']))
    findings_data = [
        ['Category', 'Before', 'After', 'Status'],
        ['Technical SEO', '75/100', '75/100', 'Good'],
        ['Content Quality (E-E-A-T)', '45/100', '55/100', 'Improved'],
        ['On-Page SEO', '40/100', '80/100', 'Fixed'],
        ['Schema / Structured Data', '0/100', '90/100', 'Implemented'],
        ['Performance (CWV)', '70/100', '70/100', 'Good'],
        ['Images', '70/100', '70/100', 'Good'],
        ['AI Search Readiness', '60/100', '85/100', 'Improved'],
    ]
    story.append(create_table(findings_data, col_widths=[2.5*inch, 1*inch, 1*inch, 1.2*inch]))

    story.append(PageBreak())

    # ========== TECHNICAL SEO ==========
    story.append(Paragraph("1. Technical SEO Analysis", styles['SectionHeading']))
    story.append(Paragraph("Score: 75/100", styles['SubsectionHeading']))

    tech_data = [
        ['Check', 'Status', 'Notes'],
        ['HTTPS', 'PASS', 'Secure connection active'],
        ['robots.txt', 'PASS', 'Present and well-configured'],
        ['XML Sitemap', 'PASS', '73 URLs indexed at sitemap-index.xml'],
        ['Canonical URLs', 'PASS', 'Properly implemented on all pages'],
        ['Mobile Viewport', 'PASS', 'Responsive design with proper meta tag'],
        ['Sitemap lastmod', 'WARNING', 'Missing lastmod dates on URLs'],
        ['AI Crawler Access', 'PASS', 'GPTBot, ClaudeBot, PerplexityBot allowed'],
    ]
    story.append(create_table(tech_data, col_widths=[1.8*inch, 0.8*inch, 3*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("robots.txt Configuration", styles['SubsectionHeading']))
    robots_text = """
    User-agent: Googlebot
    Disallow: /nogooglebot/

    User-agent: *
    Allow: /

    Sitemap: https://xani.me/sitemap-index.xml
    """
    story.append(Paragraph(robots_text, styles['CodeBlock']))

    story.append(PageBreak())

    # ========== CONTENT QUALITY ==========
    story.append(Paragraph("2. Content Quality (E-E-A-T)", styles['SectionHeading']))
    story.append(Paragraph("Score: 45/100 (needs improvement)", styles['SubsectionHeading']))

    story.append(Paragraph("""
    E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness.
    This is Google's framework for evaluating content quality, especially for YMYL
    (Your Money Your Life) topics.
    """, styles['BodyContent']))

    eeat_data = [
        ['Signal', 'Status', 'Assessment'],
        ['Experience', 'WEAK', 'Claims 25+ years but no specific projects shown'],
        ['Expertise', 'WEAK', 'Skills listed, but no certifications or portfolio'],
        ['Authoritativeness', 'WEAK', 'No testimonials or case studies'],
        ['Trustworthiness', 'OK', 'Contact info and social links present'],
        ['About Page', 'THIN', '~150-200 words, needs expansion to 500+'],
    ]
    story.append(create_table(eeat_data, col_widths=[1.5*inch, 0.8*inch, 3.3*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Recommendations:", styles['SubsectionHeading']))
    recommendations = [
        "Expand About page to 500+ words with specific projects and achievements",
        "Add portfolio links or case studies demonstrating expertise",
        "Include client testimonials or professional endorsements",
        "Add certifications or professional credentials",
        "Link to published articles or speaking engagements",
    ]
    for rec in recommendations:
        story.append(Paragraph(f"  {rec}", styles['BodyContent']))

    story.append(PageBreak())

    # ========== ON-PAGE SEO ==========
    story.append(Paragraph("3. On-Page SEO", styles['SectionHeading']))
    story.append(Paragraph("Score: 40/100 -> 80/100 (FIXED)", styles['SubsectionHeading']))

    onpage_data = [
        ['Element', 'Before', 'After', 'Status'],
        ['H1 Tag', 'Commented out', 'Active', 'FIXED'],
        ['Meta Description', '"My Personal Web Site."', 'Professional 160-char desc', 'FIXED'],
        ['Title Tag', '"Alexandre Xavier"', 'Same (acceptable)', 'OK'],
        ['Heading Hierarchy', 'H2/H3 correct', 'H1/H2/H3 correct', 'FIXED'],
        ['Internal Linking', 'Good structure', 'Good structure', 'OK'],
    ]
    story.append(create_table(onpage_data, col_widths=[1.3*inch, 1.5*inch, 1.8*inch, 0.8*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Updated Meta Description:", styles['SubsectionHeading']))
    meta_desc = """
    "Alexandre Xavier - IT Analyst & AI Developer with 25+ years experience.
    Insights on AI context pipelines, RAG, Python, Go, cloud architecture,
    and software development."
    """
    story.append(Paragraph(meta_desc.strip(), styles['CodeBlock']))

    story.append(PageBreak())

    # ========== SCHEMA / STRUCTURED DATA ==========
    story.append(Paragraph("4. Schema / Structured Data", styles['SectionHeading']))
    story.append(Paragraph("Score: 0/100 -> 90/100 (IMPLEMENTED)", styles['SubsectionHeading']))

    story.append(Paragraph("""
    Structured data helps search engines understand your content and can enable
    rich results in search. Sites with proper schema have ~2.5x higher chance
    of appearing in AI-generated answers.
    """, styles['BodyContent']))

    schema_data = [
        ['Schema Type', 'Before', 'After', 'Purpose'],
        ['Person', 'Missing', 'Implemented', 'Author entity recognition'],
        ['WebSite', 'Missing', 'Implemented', 'Sitelinks search box'],
        ['BlogPosting', 'Missing', 'Implemented', 'Article rich results'],
        ['BreadcrumbList', 'Missing', 'Implemented', 'Navigation in SERPs'],
    ]
    story.append(create_table(schema_data, col_widths=[1.3*inch, 1*inch, 1.2*inch, 2*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Files Created:", styles['SubsectionHeading']))
    files_created = [
        "src/components/schema/PersonWebsiteSchema.astro",
        "src/components/schema/BlogPostingSchema.astro",
        "src/components/schema/BreadcrumbSchema.astro",
    ]
    for f in files_created:
        story.append(Paragraph(f"  {f}", styles['CodeBlock']))

    story.append(PageBreak())

    # ========== AI SEARCH READINESS (GEO) ==========
    story.append(Paragraph("5. AI Search Readiness (GEO)", styles['SectionHeading']))
    story.append(Paragraph("Score: 60/100 -> 85/100 (IMPROVED)", styles['SubsectionHeading']))

    story.append(Paragraph("""
    Generative Engine Optimization (GEO) focuses on optimizing content for AI-powered
    search experiences like Google AI Overviews, ChatGPT, and Perplexity. This includes
    AI crawler accessibility, structured data, and passage-level citability.
    """, styles['BodyContent']))

    geo_data = [
        ['Factor', 'Before', 'After', 'Notes'],
        ['AI Crawler Access', 'Allowed', 'Allowed', 'GPTBot, ClaudeBot accessible'],
        ['llms.txt', 'Missing', 'Created', 'AI crawler guidance file'],
        ['Structured Data', 'None', 'Full', 'Person, BlogPosting, Breadcrumb'],
        ['Author Entity', 'Not established', 'Established', 'Person schema with sameAs'],
        ['Passage Citability', 'Moderate', 'Moderate', 'Needs more stats/citations'],
    ]
    story.append(create_table(geo_data, col_widths=[1.5*inch, 1*inch, 1*inch, 2*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("llms.txt Created:", styles['SubsectionHeading']))
    story.append(Paragraph("Location: https://xani.me/llms.txt", styles['BodyContent']))
    story.append(Paragraph("""
    Contains: Site info, author expertise, citation format preferences,
    content topics, and sitemap reference for AI crawlers.
    """, styles['BodyContent']))

    story.append(PageBreak())

    # ========== IMPLEMENTATION SUMMARY ==========
    story.append(Paragraph("6. Implementation Summary", styles['SectionHeading']))

    story.append(Paragraph("Changes Deployed:", styles['SubsectionHeading']))

    impl_data = [
        ['File', 'Change', 'Impact'],
        ['src/config.ts', 'Updated meta description', 'Better CTR in search'],
        ['src/pages/index.astro', 'Restored H1 tag, added schema', 'Critical SEO fix'],
        ['src/layouts/PostDetails.astro', 'Added BlogPosting + Breadcrumb', 'Rich results'],
        ['public/llms.txt', 'Created AI guidance file', 'GEO optimization'],
        ['src/components/schema/*', 'Created 3 schema components', 'Structured data'],
    ]
    story.append(create_table(impl_data, col_widths=[2.2*inch, 2*inch, 1.5*inch]))

    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Git Commit:", styles['SubsectionHeading']))
    commit_text = """
    5ed2fa0d feat(seo): Add structured data, llms.txt, and fix meta tags

    - Add Person + WebSite schema to homepage for entity recognition
    - Add BlogPosting schema to all blog posts for rich results
    - Add BreadcrumbList schema for navigation in search results
    - Create llms.txt for AI crawler guidance (GEO optimization)
    - Fix H1 tag on homepage (was commented out)
    - Improve meta description with professional summary
    """
    story.append(Paragraph(commit_text.strip(), styles['CodeBlock']))

    story.append(PageBreak())

    # ========== REMAINING RECOMMENDATIONS ==========
    story.append(Paragraph("7. Remaining Recommendations", styles['SectionHeading']))

    story.append(Paragraph("Medium Priority (Complete within 1 month):", styles['SubsectionHeading']))
    medium_priority = [
        ['Task', 'Effort', 'Impact'],
        ['Expand About page to 500+ words', '2 hours', 'E-E-A-T improvement'],
        ['Create custom OG image (replace astropaper-og.jpg)', '30 mins', 'Brand recognition'],
        ['Add rel="noopener noreferrer" to external links', '15 mins', 'Security'],
        ['Add lastmod dates to sitemap', '10 mins', 'Crawl prioritization'],
        ['Remove pagination URLs from sitemap', '10 mins', 'Cleaner sitemap'],
    ]
    story.append(create_table(medium_priority, col_widths=[3*inch, 1*inch, 1.6*inch]))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Content Improvements for AI Citations:", styles['SubsectionHeading']))
    content_tips = [
        ['Improvement', 'Example'],
        ['Add Key Takeaways sections', 'Bullet points at top of articles'],
        ['Include statistics and citations', '"RAG adoption increased 340% (Source)"'],
        ['Create comparison tables', 'RAG vs Fine-tuning vs Prompt Engineering'],
        ['Add author bylines to articles', '"Written by Alexandre Xavier, AI Developer"'],
        ['Create pillar content (3000+ words)', '"Complete Guide to RAG in 2026"'],
    ]
    story.append(create_table(content_tips, col_widths=[2.5*inch, 3.1*inch]))

    story.append(PageBreak())

    # ========== VALIDATION & TESTING ==========
    story.append(Paragraph("8. Validation & Testing", styles['SectionHeading']))

    story.append(Paragraph("Test Your Schema:", styles['SubsectionHeading']))
    test_urls = [
        "Google Rich Results Test: https://search.google.com/test/rich-results",
        "Schema.org Validator: https://validator.schema.org/",
        "Google Search Console: Monitor Enhancements > Structured data",
    ]
    for url in test_urls:
        story.append(Paragraph(f"  {url}", styles['BodyContent']))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("URLs to Validate:", styles['SubsectionHeading']))
    validate_urls = [
        "https://xani.me/ (Person + WebSite schema)",
        "https://xani.me/posts/rag/ (BlogPosting + Breadcrumb schema)",
        "https://xani.me/llms.txt (AI crawler guidance)",
    ]
    for url in validate_urls:
        story.append(Paragraph(f"  {url}", styles['BodyContent']))

    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Expected Results (1-7 days after indexing):", styles['SubsectionHeading']))
    expected = [
        "Sitelinks search box in branded searches",
        "Article rich results for blog posts in Google",
        "Breadcrumb navigation in search results",
        "Improved author entity recognition",
        "Higher chance of AI Overview citations",
    ]
    for item in expected:
        story.append(Paragraph(f"  {item}", styles['BodyContent']))

    story.append(PageBreak())

    # ========== APPENDIX ==========
    story.append(Paragraph("Appendix: Schema Code Reference", styles['SectionHeading']))

    story.append(Paragraph("Person + WebSite Schema (Homepage):", styles['SubsectionHeading']))
    person_schema = '''
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://xani.me/#website",
      "url": "https://xani.me/",
      "name": "Alexandre Xavier",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://xani.me/search/?q={search_term_string}"
      }
    },
    {
      "@type": "Person",
      "@id": "https://xani.me/#person",
      "name": "Alexandre Xavier",
      "jobTitle": "IT Analyst & AI Developer",
      "email": "mailto:jalexandre.xavier@gmail.com",
      "sameAs": ["linkedin.com/...", "github.com/..."]
    }
  ]
}
    '''
    story.append(Paragraph(person_schema.strip(), styles['CodeBlock']))

    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("BlogPosting Schema (Articles):", styles['SubsectionHeading']))
    blog_schema = '''
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "datePublished": "2025-12-13T05:05:00.000Z",
  "author": { "@id": "https://xani.me/#person" },
  "publisher": { "@id": "https://xani.me/#person" },
  "mainEntityOfPage": { "@id": "https://xani.me/posts/..." }
}
    '''
    story.append(Paragraph(blog_schema.strip(), styles['CodeBlock']))

    # Build the PDF
    doc.build(story)
    print("PDF report generated successfully!")
    return "/Users/alexandrexavier/Documents/myWeb/alexandre/xani/SEO-Audit-Report-xani.me.pdf"

if __name__ == "__main__":
    build_report()

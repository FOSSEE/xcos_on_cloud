<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="no" />
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>
     <!-- To remove the mxCell id="...#identifier" tag from Xcos -->
    <xsl:template match="mxCell[contains(@id, '#identifier')]" />
     <!-- To remove the mxCell as="defaultParent" tag from Xcos -->
    <xsl:template match="mxCell[@as = 'defaultParent']" />
</xsl:stylesheet>
